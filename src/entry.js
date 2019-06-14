import {createInflateRaw} from 'zlib'
import CentralHeaderInfo from './central-header-info'
import LocalHeaderInfo from './local-header-info'
import {LOCAL_HEADER_LENGTH} from './constants'
import LocalHeaderWriter from './local-header-writer'
import CRC32Writer from './crc32-writer'
import CRC32 from './crc32'
import DataControlXform from './data-control-xform'
import LocalHeaderDecoder from './local-header-decoder'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = async (outputPath) => {

        outputPath = outputPath + '/'

        const startPos = this.header.getOffsetOfLocalFileHeader()
        const endPos = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + this.header.getFileName().length + 65536 + this.header.getCompressedSize() - 1

        const streamReader = this.file.createReadStream(startPos, endPos)
        const decoder = new LocalHeaderDecoder()

        await this._extract(outputPath, streamReader, decoder)

        streamReader.destroy()
    }

    _extract = async (outputPath, streamReader, decoder) => {

        // console.log(this.header.getFileName())

        //if ('node_modules/.bin/atob.cmd' === this.header.getFileName())
         //   debugger

        const fileName = outputPath + this.header.getFileName()

        const decodePromise = new Promise((resolve) => {

            streamReader.on('readable', () => {

                for (;;) {

                    const data = streamReader.read(1024)

                    if (!data)
                        return

                    const unshiftedChunk = decoder.update(data)

                    if (unshiftedChunk) {

                        streamReader.removeAllListeners()
                        streamReader.unshift(unshiftedChunk)

                        decoder.decode()
                        resolve()
                        return
                    }
                }
            })
        })

        await decodePromise

        if (this.header.isDirectory()) {

            await this.file.makeDir(fileName)
            return
        }

        const fileWriter = this.file.createWriteStream(fileName)
        const crc32 = new CRC32()

        if (this.header.isCompressed())
            return await new Promise((resolve) => {

                const size = this.header.getCompressedSize()
                let counter = 0

                const inflator = createInflateRaw()
                inflator.pipe(fileWriter)

                streamReader.on('data', (data) => {

                    if ((counter + data.length) < size) {

                        counter += data.length
                        crc32.update(data)

                        if (!fileWriter.write(data, 'buffer')) {

                            // console.log('enough write!')
                            streamReader.pause()
                            return
                        }
                    } else {

                        streamReader.pause()

                        // console.log('bullshit')
                        debugger


                        fileWriter.end(data.slice(0, size - counter))
                        streamReader.pause()
                        streamReader.unshift(data.slice(size - counter))
                        resolve()
                    }
                })

                fileWriter.on('drain', () => {

                    // console.log('driner')
                    streamReader.resume()
                })

                streamReader.resume()
            })

            streamReader.removeAllListeners()

            debugger
            /*
        if (this.header.isCompressed())
            return await new Promise((resolve) =>
                streamReader.pipe(dataControlXform).pipe(createInflateRaw()).pipe(crc32Xform).pipe(fileWriter).on('finish', resolve))
                */
    }

    test = () => {

        const startPos = this.header.getOffsetOfLocalFileHeader()
        const endPos = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + this.header.getFileName().length + 65536 - 1

        const readStream = this.file.createReadStream(startPos, endPos)
        const localHeaderDecoder = new LocalHeaderDecoder()

        return this._test(readStream, localHeaderDecoder)
    }

    _test = async (readStream, localHeaderDecoder) => {

        const localHeaderWriter = new LocalHeaderWriter(readStream, this.header, localHeaderDecoder)
        await once(readStream.pipe(localHeaderWriter), 'finish')

        if (this.header.isDirectory())
            return

        const dataControlXform = new DataControlXform(readStream, this.header.getCompressedSize())
        const crc32Writer = new CRC32Writer(this.header)

        if (!this.header.isCompressed()) {

            await once(readStream.pipe(dataControlXform).pipe(crc32Writer), 'finish')
            return
        }

        if (this.header.isCompressed()) {

            await once(readStream.pipe(dataControlXform).pipe(createInflateRaw()).pipe(crc32Writer), 'finish')
            return
        }
    }

    isDirectory = () => this.header.isDirectory()

    getFilename = () => this.header.getFileName()

    getLocalHeader = async () => {

        if (this.localHeader)
            return this.localHeader

        this.localHeader = await this._readLocalHeader()
        return this.localHeader
    }

    _readLocalHeader = async () => {

        const start = this.header.getOffsetOfLocalFileHeader()
        const end = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + 65536 + 65536 - 1 // -1 because inclusive
        const highWaterMark = 1024

        const readStream = this.file.createReadStreamWithHighWaterMark(start, end, highWaterMark)
        const writeStream = new LocalHeaderWriter()

        const promise = new Promise((resolve) => {

            let header

            readStream.pipe(writeStream)

            writeStream.on('data', (data) => header = data)
            writeStream.on('finish', () => resolve(header))
        })

        return promise
    }

    getCentralHeaderInfo = () => {

        return new CentralHeaderInfo(this.header).toString()
    }

    getLocalHeaderInfo = async () => {

        return new LocalHeaderInfo(await this._readLocalHeader()).toString()
    }
}

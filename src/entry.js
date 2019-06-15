import {createInflateRaw} from 'zlib'
import CentralHeaderInfo from './central-header-info'
import LocalHeaderInfo from './local-header-info'
import {LOCAL_HEADER_LENGTH} from './constants'
import CRC32 from './crc32'
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

    _extract = async (outputPath, fileReader, decoder) => {

        const fileName = outputPath + this.header.getFileName()

        const decodePromise = new Promise((resolve) => {

            fileReader.on('readable', () => {

                for (;;) {

                    const data = fileReader.read(1024)

                    if (!data)
                        return

                    const unshiftedChunk = decoder.update(data)

                    if (unshiftedChunk) {

                        fileReader.removeAllListeners()
                        fileReader.unshift(unshiftedChunk)

                        decoder.decode()
                        resolve()

                        // console.log(this.header.getFileName())
                        // console.log('loc header: ' + decoder.offset)
                        // console.log('loc size:' + this.header.getCompressedSize())
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
        const size = this.header.getCompressedSize()
        const crc32 = new CRC32()

        let counter = 0

        if (this.header.isCompressed()) {

            const promise = new Promise((resolve) => {

                let counter = 0

                const inflater = createInflateRaw()
                inflater.pipe(fileWriter)

                inflater.on('drain', () => fileReader.resume())
                fileWriter.on('finish', resolve)

                fileReader.on('data', (chunk) => {

                    const remainingBytes = size - counter

                    if (chunk.length < remainingBytes) {

                        if (!inflater.write(chunk, 'buffer'))
                            fileReader.pause()

                        counter += chunk.length
                        crc32.update(chunk)

                        return
                    }

                    const partialChunk = chunk.slice(0, remainingBytes)

                    crc32.update(partialChunk)
                    inflater.end(partialChunk)

                    fileReader.pause()
                    fileReader.unshift(chunk.slice(remainingBytes))
                    resolve()
                })

                fileReader.resume()
            })

            await promise
        }

        if (!this.header.isCompressed()) {

            const promise = new Promise((resolve) => {

                fileWriter.on('drain', () => fileReader.resume())
                fileWriter.on('finish', resolve)

                fileReader.on('data', (chunk) => {

                    const remainingBytes = size - counter

                    if (chunk.length < remainingBytes) {

                        if (!fileWriter.write(chunk, 'buffer'))
                            fileReader.pause()

                        counter += chunk.length
                        crc32.update(chunk)

                        return
                    }

                    const partialChunk = chunk.slice(0, remainingBytes)

                    crc32.update(partialChunk)
                    fileWriter.end(partialChunk)

                    fileReader.pause()
                    fileReader.unshift(chunk.slice(remainingBytes))
                })

                fileReader.resume()
            })

            await promise
        }

       fileReader.removeAllListeners()
    }

    test = () => {

        const startPos = this.header.getOffsetOfLocalFileHeader()
        const endPos = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + this.header.getFileName().length + 65536 - 1

        const readStream = this.file.createReadStream(startPos, endPos)
        const localHeaderDecoder = new LocalHeaderDecoder()

        return this._test(readStream, localHeaderDecoder)
    }

    _test = async (fileReader, decoder) => {

        const decodePromise = new Promise((resolve) => {

            fileReader.on('readable', () => {

                for (;;) {

                    const data = fileReader.read(1024)

                    if (!data)
                        return

                    const unshiftedChunk = decoder.update(data)

                    if (unshiftedChunk) {

                        fileReader.removeAllListeners()
                        fileReader.unshift(unshiftedChunk)

                        decoder.decode()

                        /*

                        test

                        */

                        resolve()
                        return
                    }
                }
            })
        })

        await decodePromise

        const size = this.header.getCompressedSize()
        const crc32 = new CRC32()

        let counter = 0

        if (this.header.isCompressed()) {

            const promise = new Promise((resolve) => {

                let counter = 0

                const inflater = createInflateRaw()
                inflater.on('drain', () => fileReader.resume())
                inflater.on('finish', resolve)

                fileReader.on('data', (chunk) => {

                    const remainingBytes = size - counter

                    if (chunk.length < remainingBytes) {

                        if (!inflater.write(chunk, 'buffer'))
                            fileReader.pause()

                        counter += chunk.length
                        crc32.update(chunk)

                        return
                    }

                    const partialChunk = chunk.slice(0, remainingBytes)

                    crc32.update(partialChunk)
                    inflater.end(partialChunk)

                    fileReader.pause()
                    fileReader.unshift(chunk.slice(remainingBytes))
                    resolve()
                })

                fileReader.resume()
            })

            await promise
        }

        if (!this.header.isCompressed()) {

            const promise = new Promise((resolve) => {

                fileReader.on('data', (chunk) => {

                    const remainingBytes = size - counter

                    if (chunk.length < remainingBytes) {

                        counter += chunk.length
                        crc32.update(chunk)

                        return
                    }

                    const partialChunk = chunk.slice(0, remainingBytes)
                    crc32.update(partialChunk)

                    fileReader.pause()
                    fileReader.unshift(chunk.slice(remainingBytes))
                    resolve()
                })

                fileReader.resume()
            })

            await promise
        }

       fileReader.removeAllListeners()
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

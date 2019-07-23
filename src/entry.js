import {createInflateRaw} from 'zlib'
import {PassThrough} from 'stream'
import {LOCAL_HEADER_LENGTH} from './constants'
import CRC32 from './crc32'
import LocalHeaderDecoder from './local-header-decoder'
import {LOC_MAX} from './constants'
import DumpWriter from './dump-writer'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = async (outputPath) => {

        const startPos = this.header.getOffsetOfLocalFileHeader()
        const endPos = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + this.header.getFileName().length + 65536 + this.header.getCompressedSize() - 1
        const fileReader = this.file.createReadStream(startPos, endPos)

        await this._extract(outputPath, fileReader)

        fileReader.destroy()
    }

    _extract = async (outputPath, fileReader) => {

        const fileName = outputPath + '/' + this.header.getFileName()
        await this._readLocalHeader(fileReader)

        if (this.header.isDirectory())
            return await this.file.makeDir(fileName)

        const fileWriter = this.file.createWriteStream(fileName)
        await this._operator(fileWriter, fileReader)
    }

    test = () => {

        const start = this.header.getOffsetOfLocalFileHeader()
        const end = this.header.getOffsetOfLocalFileHeader() + LOC_MAX - 1

        const fileReader = this.file.createReadStream(start, end)

        return this._test(fileReader)
    }

    _test = async (fileReader) => {

        await this._readLocalHeader(fileReader)

        if (this.header.isDirectory())
            return

        const dumpWriter = new DumpWriter()
        await this._operator(dumpWriter, fileReader)
    }

    _operator = async (fileWriter, fileReader) => {

        const size = this.header.getCompressedSize()
        const crc32 = new CRC32()
        const inflater = this.header.isCompressed() ? createInflateRaw() : new PassThrough()
        let counter = 0

        const promise = new Promise((resolve) => {

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
            })

            fileReader.resume()
        })

        await promise

       fileReader.removeAllListeners()
    }

    isDirectory = () => this.header.isDirectory()

    getFilename = () => this.header.getFileName()

    _readLocalHeader = async (fileReader) => {

        await new Promise((resolve) => {

            const decoder = new LocalHeaderDecoder()

            fileReader.on('data', (chunk) => {

                const unshiftedChunk = decoder.update(chunk)

                if (unshiftedChunk) {

                    fileReader.pause()
                    fileReader.removeAllListeners()
                    fileReader.unshift(unshiftedChunk)

                    decoder.decode()
                    resolve()
                }
            })

            fileReader.resume()
        })
    }
}

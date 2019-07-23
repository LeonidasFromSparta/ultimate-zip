import {createInflateRaw} from 'zlib'
import {PassThrough} from 'stream'
import {LOCAL_HEADER_LENGTH} from './constants'
import CRC32 from './crc32'
import LocalHeaderDecoder from './local-header-decoder'
import {LOC_MAX} from './constants'
import DumpWriter from './dump-writer'
import CRC32Stream from './crc32-stream'

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

    _operator = async (writer, reader) => {

        const size = this.header.getCompressedSize()
        const inflater = this.header.isCompressed() ? createInflateRaw() : new PassThrough()
        const crc32Stream = new CRC32Stream(new CRC32())

        const promise = new Promise((resolve) => {

            let bytesCounter = 0

            reader.on('data', (chunk) => {

                const remainingBytes = size - bytesCounter

                if (chunk.length < remainingBytes) {

                    if (!inflater.write(chunk, 'buffer'))
                        reader.pause()

                    bytesCounter += chunk.length
                    return
                }

                inflater.end(chunk.slice(0, remainingBytes))

                reader.pause()
                reader.removeAllListeners()
                reader.unshift(chunk.slice(remainingBytes))
            })

            inflater.pipe(crc32Stream).pipe(writer)
            inflater.on('drain', () => reader.resume())
            writer.on('finish', resolve)

            reader.resume()
        })

        await promise

        if (this.header.getCRC32() !== crc32Stream.crc32.getValue())
            throw 'keke again'
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

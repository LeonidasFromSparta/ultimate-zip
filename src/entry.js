import {createInflateRaw} from 'zlib'
import CRC32PassThroughStream from './crc32-passthrough-stream'
import CRC32WriteableStream from './crc32-writeable-stream'
import CentralHeaderInfo from './central-header-info'
import LocalHeaderSerializer from './local-header-serializer'
import LocalHeaderTransformer from './local-header-transformer'
import LocalHeaderInfo from './local-header-info'
import {LOCAL_HEADER_LENGTH} from '../src/constants'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = async (path) => {

        const filename = path + '/' + this.header.getFileName()

        if (this.header.isDirectory())
            return this.file.makeDir(filename)

        const startPos = this.header.getOffsetOfLocalFileHeader() + LocalHeaderSerializer.HEADER_FIXED_LENGTH + this.header.getFileName().length
        const endPos = this.header.getOffsetOfLocalFileHeader() + this.header.getCompressedSize() + LocalHeaderSerializer.HEADER_FIXED_LENGTH + this.header.getFileName().length - 1

        if (this.header.isCompressed()) {

            return new Promise(async (resolve) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crc32PassThroughStream = new CRC32PassThroughStream()
                const writeStream = this.file.createWriteStream(filename)

                readStream.pipe(createInflateRaw()).pipe(crc32PassThroughStream).pipe(writeStream)

                crc32PassThroughStream.on('end', () => {

                    if (crc32PassThroughStream.getValue() !== this.header.getCRC32()) {

                        console.log(this.header.toString())
                    }
                })

                writeStream.on('finish', () => resolve())
            })
        }

        if (!this.header.isCompressed()) {

            return new Promise(async (resolve) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crc32PassThroughStream = new CRC32PassThroughStream()
                const writeStream = this.file.createWriteStream(filename)

                readStream.pipe(crc32PassThroughStream).pipe(writeStream)

                writeStream.on('finish', () => {

                    resolve()
                })

                crc32PassThroughStream.on('end', () => {

                    if (crc32PassThroughStream.getValue() !== this.header.getCRC32()) {

                        console.log(this.header.toString())
                    }
                })
            })
        }
    }

    test = () => {

        const startPos = this.header.getOffsetOfLocalFileHeader() + LocalHeaderSerializer.HEADER_FIXED_LENGTH + this.header.getFileNameLength()
        const endPos = this.header.getOffsetOfLocalFileHeader() + this.header.getCompressedSize() + LocalHeaderSerializer.HEADER_FIXED_LENGTH + this.header.getFileNameLength()

        if (!this.header.isCompressed()) {

            return new Promise(async (resolve) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crc32WriteableStream = new CRC32WriteableStream()

                readStream.pipe(crc32WriteableStream)

                crc32WriteableStream.on('finish', () => {

                    if (crc32WriteableStream.getValue() !== this.header.getCRC32())
                        console.log('kekeke')

                    resolve()
                })
            })
        }

        if (this.header.isCompressed()) {

            return new Promise(async (resolve) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crc32WriteableStream = new CRC32WriteableStream()

                readStream.pipe(createInflateRaw()).pipe(crc32WriteableStream)

                crc32WriteableStream.on('finsih', () => {

                    if (crc32WriteableStream.getValue() !== this.header.getCRC32())
                        console.log('kekeke')

                    resolve()
                })
            })
        }
    }

    isDirectory = () => this.header.isDirectory()

    getFilename = () => this.header.getFileName()

    getLocalHeader = async () => {

        const start = this.header.getOffsetOfLocalFileHeader()
        const end = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + 65536 + 65536 - 1 // -1 because inclusive
        const highWaterMark = 1024

        const readStream = this.file.createReadStreamWithHighWaterMark(start, end, highWaterMark)
        const writeStream = new LocalHeaderTransformer()

        const promise = new Promise((resolve) => {

            let header

            readStream.pipe(writeStream)

            writeStream.on('data', (data) => header = data)
            writeStream.on('finish', () => resolve(header))
        })

        this.localHeader = await promise
        return this.localHeader
    }

    getCentralHeaderInfo = () => {

        return new CentralHeaderInfo(this.header).toString()
    }

    getLocalHeaderInfo = async () => {

        return new LocalHeaderInfo(await this.getLocalHeader()).toString()
    }
}

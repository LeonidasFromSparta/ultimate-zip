import {createInflateRaw} from 'zlib'
import CRC32PassThroughStream from './crc32-passthrough-stream'
import CRC32Transformer from './crc32-transformer'
import CentralHeaderInfo from './central-header-info'
import LocalHeaderSerializer from './local-header-serializer'
import LocalHeaderTransformer from './local-header-transformer'
import LocalHeaderInfo from './local-header-info'
import {LOCAL_HEADER_LENGTH} from './constants'
import WriterLocal from './local-header-transformer.write'

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

    test = async () => {

        const startPos = this.header.getOffsetOfLocalFileHeader()
        const endPos = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + this.header.getFileName().length + 65536 + this.header.getCompressedSize() - 1

        if (!this.header.isCompressed()) {

            debugger

            const readStream = this.file.createReadStream(startPos, endPos)
            // const crc32WriteableStream = new CRC32Transformer()

            const locHeaderPromise = new Promise((resolve) => {

                const localHeaderTransformer = new WriterLocal()

                readStream.pipe(localHeaderTransformer)
                .on('finish', () => resolve({header: localHeaderTransformer.header, chunk: localHeaderTransformer.chunk}))
            })

            debugger

            const data = await locHeaderPromise

            readStream.unpipe()
            readStream.unshift(data.chunk)

            const crc32Promise = new Promise((resolve) => {

                const writeStream = new CRC32Transformer()

                readStream.pipe(localHeaderTransformer)
                .on('finish', () => resolve({header: localHeaderTransformer.header, chunk: localHeaderTransformer.chunk}))
            })

            debugger
        }

        /*
        if (this.header.isCompressed()) {

            return new Promise(async (resolve) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crc32WriteableStream = new CRC32Transformer()

                readStream.pipe(createInflateRaw()).pipe(crc32WriteableStream)

                crc32WriteableStream.on('finsih', () => {

                    if (crc32WriteableStream.getValue() !== this.header.getCRC32())
                        console.log('kekeke')

                    resolve()
                })
            })
        }
        */
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
        const writeStream = new WriterLocal()

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

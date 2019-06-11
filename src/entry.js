import {createInflateRaw} from 'zlib'
import CRC32PassThroughStream from './crc32-passthrough-stream'
import CentralHeaderInfo from './central-header-info'
import LocalHeaderInfo from './local-header-info'
import {LOCAL_HEADER_LENGTH} from './constants'
import LocalHeaderWriter from './local-header-writer'
import CRC32Writer from './crc32-writer'
import BytesCounterStream from './bytes-counter-stream'
// import fs from 'fs'
import Dupa from './dupa'

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
        const endPos = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + this.header.getFileName().length + 65536 - 1

        if (!this.header.isDirectory() && !this.header.isCompressed()) {

            /*
            const fd = fs.openSync('./samples/7z-windows-normal.zip', 'r')
            const stats = fs.fstatSync(fd)

            const buffer = Buffer.allocUnsafe(70)
            const position = this.header.getOffsetOfLocalFileHeader() + 83

            fs.readSync(Number(fd), buffer, 0, 70, position)
            fs.closeSync(fd)

            console.log(buffer.toString())
            */

            debugger

            const readStream = this.file.createReadStream(startPos, endPos)

            const localHeaderPromise = new Promise((resolve) => {

                const dupa = new Dupa()
                const writeStream = new LocalHeaderWriter()

                readStream
                .pipe(dupa)
                .pipe(writeStream)
                .on('finish', () => {

                    readStream.unpipe()

                    debugger

                    readStream.unshift(writeStream.chunk)

                    console.log(new LocalHeaderInfo(writeStream.header).toString())

                    resolve(writeStream.header)
                })
            })

            debugger

            await localHeaderPromise

            const crc32Promise = new Promise((resolve) => {

                const counterStream = new BytesCounterStream(this.header.getUncompressedSize())
                const writeStream = new CRC32Writer()

                debugger

                readStream
                .pipe(counterStream)
                .pipe(writeStream)
                .on('finish', () => {

                    debugger

                    readStream.unpipe()

                    if (writeStream.crc32.getValue() !== this.header.getCRC32())
                        console.log('keke promplem')

                    resolve()
                })

                // readStream.resume()
            })

            await crc32Promise

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

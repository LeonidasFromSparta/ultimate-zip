import crc32 from './crc32'
import LocalHeader from './local-header'
import ExtLocalHeader from './ext-local-header'
import FileContent from './file-content'
import {createInflateRaw} from 'zlib'
import path1 from 'path'
import CRC32Stream from './crc32-stream'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = async (path) => {

        const filename = path + '/' + this.header.getFileName()

        if (this.header.isDirectory())
            return this.file.makeDir(filename)

        const startPos = this.header.getOffsetOfLocalFileHeader() + LocalHeader.HEADER_FIXED_LENGTH + this.header.getFileNameLength()
        const endPos = this.header.getOffsetOfLocalFileHeader() + this.header.getCompressedSize() + LocalHeader.HEADER_FIXED_LENGTH + this.header.getFileNameLength() - 1

        if (this.header.isCompressed()) {

            return new Promise(async (resolve, reject) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crc32Stream = new CRC32Stream()
                const writeStream = this.file.createWriteStream(filename)

                readStream.pipe(createInflateRaw()).pipe(crc32Stream).pipe(writeStream)

                crc32Stream.on('end', () => {

                    if (crc32Stream.crc.getValue() !== this.header.getCRC32()) {

                        console.log(this.header.toString())
                        const keke = this.header.getCRC32()
                        debugger
                    }
                })

                writeStream.on('finish', () => resolve())
            })
        }

        if (!this.header.isCompressed()) {

            return new Promise(async (resolve, reject) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crc32Stream = new CRC32Stream()
                const writeStream = this.file.createWriteStream(filename)

                readStream.pipe(crc32Stream).pipe(writeStream)

                writeStream.on('finish', () => {

                    resolve()
                })

                crc32Stream.on('end', () => {

                    if (crc32Stream.crc.getValue() !== this.header.getCRC32()) {

                        console.log(this.header.toString())
                        const keke = this.header.getCRC32()
                        debugger
                    }
                })
            })
        }
    }

    test = () => {

        console.log(this.header.getFileName())

        const startPos = this.header.getOffsetOfLocalFileHeader() + LocalHeader.HEADER_FIXED_LENGTH + this.header.getFileNameLength()
        const endPos = this.header.getOffsetOfLocalFileHeader() + this.header.getCompressedSize() + LocalHeader.HEADER_FIXED_LENGTH + this.header.getFileNameLength()

        if (!this.header.isCompressed()) {

            return new Promise(async (resolve, reject) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crcStream = new CRC32Stream()

                readStream.pipe(crcStream)

                crcStream.on('end', () => {

                    if (crcStream.calculate() !== this.header.getCRC32())
                        console.log('kekeke')

                    resolve()
                })
            })
        }

        if (this.header.isCompressed()) {

            return new Promise(async (resolve, reject) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const crcStream = new CRC32Stream()

                readStream.pipe(createInflateRaw()).pipe(crcStream)

                crcStream.on('end', (data) => {

                    if (crcStream.calculate() !== this.header.getCRC32())
                        console.log('kekeke')

                    resolve()
                })
            })
        }
    }

    isDirectory = () => this.header.isDirectory()

    getFilename = () => this.header.getFileName()
}

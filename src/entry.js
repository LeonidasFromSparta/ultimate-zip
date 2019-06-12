import {createInflateRaw} from 'zlib'
import CentralHeaderInfo from './central-header-info'
import LocalHeaderInfo from './local-header-info'
import {LOCAL_HEADER_LENGTH} from './constants'
import LocalHeaderWriter from './local-header-writer'
import CRC32Writer from './crc32-writer'
import CRC32Xform from './crc32-xform'
import DataControlXform from './data-control-xform'
import {once} from 'events'
import LocalHeaderDecoder from './local-header-decoder'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = (outputPath) => {

        const startPos = this.header.getOffsetOfLocalFileHeader()
        const endPos = this.header.getOffsetOfLocalFileHeader() + LOCAL_HEADER_LENGTH + this.header.getFileName().length + 65536 - 1

        const readStream = this.file.createReadStream(startPos, endPos)
        const localHeaderDecoder = new LocalHeaderDecoder()

        return this._extract(outputPath, readStream, localHeaderDecoder)
    }

    _extract = async (outputPath, streamReader, localHeaderDecoder) => {

        const fileName = outputPath + this.header.getFileName()

        const localHeaderWriter = new LocalHeaderWriter(streamReader, this.header, localHeaderDecoder)
        await once(streamReader.pipe(localHeaderWriter), 'finish')

        if (this.header.isDirectory()) {

            await this.file.makeDir(fileName)
            return
        }

        const dataControlXform = new DataControlXform(streamReader, this.header.getCompressedSize())
        const crc32Xform = new CRC32Xform(this.header)
        const fileWriter = this.file.createWriteStream(fileName)

        if (!this.header.isCompressed()) {

            await once(streamReader.pipe(dataControlXform).pipe(crc32Xform).pipe(fileWriter), 'finish')
            return
        }

        if (this.header.isCompressed()) {

            await once(streamReader.pipe(dataControlXform).pipe(createInflateRaw()).pipe(crc32Xform).pipe(fileWriter), 'finish')
            return
        }
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

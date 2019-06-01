import {EOL} from 'os'
import Zip32Header from './Zip32Header'
import CentralFileHeader from './central-file-header'
import fs from 'fs'
import FileHeader from './file-header'
import File from './file'
import Entry from './Entry'
import FileContent from './FileContent'

export default class UZip {

    constructor(path, options) {

        this.file = new File(path)

        const lastBytesBuf = this.file.readLastBytes(Zip32Header.HEADER_FIXED_LENGTH + Zip32Header.MAX_ZIP_COMMENT_LENGTH)
        const eocdr32Offset = Zip32Header.locateHeaderStartPos(lastBytesBuf)

        this.zip32Header = new Zip32Header(lastBytesBuf.slice(eocdr32Offset))

        if (options !== undefined)
            if (options.cacheHeaders !== undefined && options.cacheHeaders === true)
                this.centralFileHeaders = this.readCentralFileHeaders()
    }

    readCentralFileHeaders() {


    }

    readLocalFileHeaders() {

        this.file.openFile()

        const localFileHeaders = this.centralFileHeaders.map((cfh) => {

            const position = cfh.getOffsetOfLocalFileHeader().value
            const length = FileHeader.HEADER_MAX_LENGTH

            const buffer = this.file.readBytesSync(position, length)
            return new FileHeader(buffer)
        })

        this.file.closeFile()

        return localFileHeaders
    }

    testArchive = () => {

        return new Promise((resolve, reject) => {

            const readStream = this.file.createReadStream(0, this.zip32Header.offsetOfCDWithStartingDiskNum)

            let entry = new Entry()

            readStream.on('data', (chunk) => {

                for (const byte of chunk) {

                    entry.feedByte(byte)

                    if (entry.isFeedingDone()) {

                        entry.test()
                        entry = new Entry()
                    }
                }
            })

            readStream.on('end', () => resolve())
        })
    }

    extractAll(path) {

        return new Promise((resolve, reject) => {

            const readStream = this.file.createReadStream(0, this.zip32Header.offsetOfCDWithStartingDiskNum)

            let entry = new Entry()

            readStream.on('data', (chunk) => {

                for (const byte of chunk) {

                    entry.feedByte(byte)

                    if (entry.isFeedingDone()) {

                        entry.extract()
                        entry = new Entry()
                    }
                }
            })

            readStream.on('end', () => resolve())
        })
    }

    async extractByRegex(path, regex) {

        let filteredCentralFileHeaders

        if (this.centralFileHeaders === undefined)
            filteredCentralFileHeaders = this.readCentralFileHeaders().filter((cfh) => regex.test(cfh.getFilename()))
        else
            filteredCentralFileHeaders = this.centralFileHeaders.filter((cfh) => regex.test(cfh.getFilename()))

        for (const centralHeader of filteredCentralFileHeaders) {

            await new Promise((resolve, reject) => {

                const readStream = this.file.createReadStream(centralHeader.getOffsetOfLocalFileHeader(), FileHeader.HEADER_MAX_LENGTH + centralHeader.getCompressedSize())

                const entry = new Entry()

                readStream.on('data', (chunk) => {

                    for (const byte of chunk) {

                        entry.feedByte(byte)

                        if (entry.isFeedingDone()) {

                            entry.extract()
                            readStream.destroy()
                            return
                        }
                    }
                })

                readStream.on('end', () => resolve())
            })
        }
    }

    async #readCentralFileHeaders = () => {

        const startPos = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()
        const endPos = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip32Header.getTotalSizeOfCentralDirectories()

        await new Promise((resolve, reject) => {

            const readStream = this.file.createReadStream(startPos, endPos)

            const entry = new Entry()

            readStream.on('data', (chunk) => {

                for (const byte of chunk) {

                    entry.feedByte(byte)

                    if (entry.isFeedingDone()) {

                        entry.extract()
                        readStream.destroy()
                        return
                    }
                }
            })

            readStream.on('end', () => resolve())
        })
















        const centralFileHeaders = []
        let totalBytesRead = 0

        for (let i = 0; i < this.zip32Header.entriesInCD; i++) {

            const centralFileHeader = new CentralFileHeader(buffer.slice(totalBytesRead))
            centralFileHeaders.push(centralFileHeader)
            totalBytesRead += centralFileHeader.totalHeaderLength
        }

        return centralFileHeaders
    }

    toString() {

        const centralFileHeaders = this.centralFileHeaders === undefined ? this.readCentralFileHeaders() : this.centralFileHeaders
        const localFileHeaders = this.readLocalFileHeaders()

        return this.zip32Header.toString() + EOL + centralFileHeaders.join(EOL) + EOL + localFileHeaders.join(EOL)
    }
}

import Zip32Header from './Zip32Header'
import CentralFileHeader from './CentralFileHeader'
import fs from 'fs'
import FileHeader from './FileHeader'
import File from './file'
import Entry from './Entry'
import FileContent from './FileContent'

export default class UZip {

    constructor(path) {

        this.file = new File(path)

        const lastBytesBuf = this.file.readLastBytes(Zip32Header.HEADER_FIXED_LENGTH + Zip32Header.MAX_ZIP_COMMENT_LENGTH)
        const eocdr32Offset = Zip32Header.locateHeaderStartPos(lastBytesBuf)
        this.eocdr32 = new Zip32Header(lastBytesBuf.slice(eocdr32Offset))

        this.centralFileHeaders = this.readCentralFileHeadersSync()
    }

    readCentralFileHeadersSync() {

        this.file.openFile()
        const buffer = this.file.readBytesSync(this.eocdr32.offsetOfCDWithStartingDiskNum, this.eocdr32.lengthOfCD)
        this.file.closeFile()

        const centralFileHeaders = []
        let totalBytesRead = 0

        for (let i = 0; i < this.eocdr32.entriesInCD; i++) {

            const centralFileHeader = new CentralFileHeader(buffer.slice(totalBytesRead))
            centralFileHeaders.push(centralFileHeader)
            totalBytesRead += centralFileHeader.totalHeaderLength
        }

        return centralFileHeaders
    }

    readLocalFileHeadersSync() {

        this.file.openFile()

        const localFileHeaders = this.centralFileHeaders.map((cfh) => {

            const position = cfh.readRelativeOffsetOfLocalHeader().value
            const length = FileHeader.HEADER_MAX_LENGTH

            const buffer = this.file.readBytesSync(position, length)
            return new FileHeader(buffer)
        })

        this.file.closeFile()

        return localFileHeaders
    }

    testArchiveSync() {

        this.file.openFile()

        for (const cfh of this.centralFileHeaders) {

            const headerPosition = cfh.readRelativeOffsetOfLocalHeader().value
            const headerLength = FileHeader.HEADER_MAX_LENGTH

            const headerBuffer = this.file.readBytesSync(headerPosition, headerLength)
            const localFileHeader = new FileHeader(headerBuffer)

            const dataPosition = cfh.readRelativeOffsetOfLocalHeader().value + localFileHeader.readTotalHeaderLength().value
            const dataLength = localFileHeader.readCompressedSize().value
            const dataBuffer = this.file.readBytesSync(dataPosition, dataLength)

            new Entry(localFileHeader, dataBuffer).test()
        }

        this.file.closeFile()
    }

    async extractAll(path) {

        const prom = new Promise((resolve, reject) => {

            const readStream = this.file.createReadStream()

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

            readStream.on('end', () => {

                console.log('keke done')
            })
        })
    }

    toString() {

        return this.centralFileHeaders.reduce((acc, cfh) => acc + cfh.toString() + '\n', '') + this.readLocalFileHeadersSync().reduce((acc, lfh) => acc + lfh.toString() + '\n', '')
    }
}

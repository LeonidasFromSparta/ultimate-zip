import {EOL} from 'os'
import File from './file'
import Entry from './entry'
import Zip32HeaderDecoder from './zip-32-header-decoder'
import Zip32HeaderInfo from './zip-32-header-info'
import CentralHeaderDecoder from './central-header-decoder'
import LocalHeaderDecoder from './local-header-decoder'
import Zip64LocatorDecoder from './zip64-locator-decoder'
import Zip64HeaderDecoder from './zip64-header-decoder'
import {END_MAX} from './constants'
import {ELO_HDR} from './constants'
import {ZIP_32} from './constants'
import {ZIP_64} from './constants'

export default class UZip {

    constructor(path) {

        this.file = new File(path)

        this.file.openSync()
        const fileSize = this.file.getFileSize()

        const zip32Decoder = new Zip32HeaderDecoder()

        if ((fileSize - END_MAX) < 0)
            zip32Decoder.update(this.file.readBytesSync(0, fileSize))
        else
            zip32Decoder.update(this.file.readBytesSync(fileSize - END_MAX, fileSize))

        this.zip32Header = zip32Decoder.decode()

        const zip64LocDecoder = new Zip64LocatorDecoder()
        const zip64LocStart = fileSize - this.zip32Header.getHeaderLength() - ELO_HDR
        const zip64LocEnd = fileSize - this.zip32Header.getHeaderLength()

        if (zip64LocDecoder.update(this.file.readBytesSync(zip64LocStart, zip64LocEnd))) {

            this.zip64Locator = zip64LocDecoder.decode()
            this.zipType = ZIP_64
        } else {

            this.zipType = ZIP_32
            return
        }

        const zip64HeaderDecoder = new Zip64HeaderDecoder()
        const zip64HeaderStart = this.zip64Locator.getOffsetZip64Header()
        const zip64HeaderEnd = fileSize - this.zip32Header.getHeaderLength() - ELO_HDR

        zip64HeaderDecoder.update(this.file.readBytesSync(zip64HeaderStart, zip64HeaderEnd))
        this.zip64Header = zip64HeaderDecoder.decode()
        this.file.closeSync()
    }

    testArchive = async () => {

        const entries = await this._readEntries()
        const decoder = new LocalHeaderDecoder()
        const end = - 1 + this.zipType === ZIP_32 ? this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() : this.zip64Header.getCentralDirectoriesOffsetWithStartingDisk()

        await this.file.open()
        let fileReader = this.file.createReadStream(0, end)

        debugger

        for (let i=0; i < entries.length; i++) {

            const fileReaderPos = fileReader.start + fileReader.bytesRead - fileReader.readableLength

            if (fileReaderPos !== entries[i].header.getOffsetOfLocalFileHeader()) {

                const start = entries[i].header.getOffsetOfLocalFileHeader()
                fileReader = this.file.createFdReadStream(start, end)
            }

            await entries[i]._test(fileReader, decoder)
        }

        await this.file.close()
    }

    testFile = async (fileName) => {

        const entries = await this._readEntries()

        for (let i=0; i < entries.length; i++) {

            if (entries[i].header.getFileName() === fileName) {

                await entries[i]._test()
                break
            }
        }
    }

    extractArchive = async (outputPath) => {

        outputPath = outputPath + '/'
        const entries = await this._readEntries()
        const decoder = new LocalHeaderDecoder()
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()

        await this.file.open()
        let fileReader = this.file.createFdReadStream(0, end)

        for (let i=0; i < entries.length; i++) {

            const fileReaderPos = fileReader.start + fileReader.bytesRead - fileReader.readableLength

            if (fileReaderPos !== entries[i].header.getOffsetOfLocalFileHeader()) {

                const start = entries[i].header.getOffsetOfLocalFileHeader()
                fileReader = this.file.createFdReadStream(start, end)
            }

            await entries[i]._extract(outputPath, fileReader, decoder)
        }

        await this.file.close()
    }

    extractByRegex = async (regex, path) => {

        const entries = this._readEntries().filter((obj) => obj.getFilename().test(regex))

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractFile = async (filename, path) => {

        const entries = this._readEntries().filter((obj) => obj.getFilename() === filename)

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    getEntries = () => {

        return this._readEntries()
    }

    _readEntries = async () => {

        if (this.entries)
            return this.entries

        let start = 0
        let end = 0

        if (this.zipType === ZIP_32) {

            start = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()
            end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip32Header.getCentralDirectoriesSize() - 1
        } else {

            start = this.zip64Header.getCentralDirectoriesOffsetWithStartingDisk()
            end = this.zip64Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip64Header.getCentralDirectoriesSize() - 1
        }

        const promise = new Promise((resolve) => {

            const readStream = this.file.createReadStream(start, end)
            const decoder = new CentralHeaderDecoder()
            const entries = []

            readStream.on('data', (chunk) => {

                while (chunk) {

                    chunk = decoder.update(chunk)

                    if (chunk)
                        entries.push(new Entry(decoder.decode(), this.file))
                }
            })

            readStream.on('end', () => {

                resolve(entries)
            })
        })

        this.entries = await promise

        return this.entries
    }

    getInfo = () => {

        const entries = this._readEntries()
        // const localFileHeaders = await this.readLocalFileHeaders()

        // return this.zip32Header.toString() + EOL + centralHeaders.join(EOL) + EOL + localFileHeaders.join(EOL)
        const d = new Zip32HeaderInfo(this.zip32Header).toString() + EOL + entries.reduce((accu, obj) => accu + obj.getInfo() + EOL, '')
        return d
    }
}

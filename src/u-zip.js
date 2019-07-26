import File from './file'
import Entry from './entry'
import Zip32HeaderDecoder from './zip-32-header-decoder'
import CentralHeaderDecoder from './central-header-decoder'
import Zip64LocatorDecoder from './zip64-locator-decoder'
import Zip64HeaderDecoder from './zip64-header-decoder'
import {END_MAX} from './constants'
import {ELO_HDR} from './constants'

export default class UZip {

    constructor(path, file = new File(path)) {

        this.file = file
        this.file.openSync()
        this._decodeZip32Header(file)

        const locPos = this._decodeZip64Locator(file)

        if (locPos !== -1)
            this._decodeZip64Header(file)

        this.file.closeSync()
    }

    _decodeZip32Header = (file, decoder = new Zip32HeaderDecoder()) => {

        const size = file.getFileSize()

        const bytes = this.file.readBytesSync((size - END_MAX) < 0 ? 0 : size - END_MAX, size)
        decoder.update(bytes)

        this.zipHeader = decoder.decode()
    }

    _decodeZip64Locator = (file, decoder = new Zip64LocatorDecoder()) => {

        const size = file.getFileSize()

        const locStart = size - this.zipHeader.getHeaderLength() - ELO_HDR
        const locEnd = size - this.zipHeader.getHeaderLength() + 16

        if (decoder.update(this.file.readBytesSync(locStart, locEnd)))
            return decoder.decode().getOffsetZip64Header()
        else
            return -1
    }

    _decodeZip64Header = (file, startPos, zip64HeaderDecoder = new Zip64HeaderDecoder()) => {

        const endPos = startPos + 48
        zip64HeaderDecoder.update(this.file.readBytesSync(startPos, endPos))
        const zip64Header = zip64HeaderDecoder.decode()

        this.zipHeader.setCentralDirectoriesNumber(zip64Header.getCentralDirectoriesNumber())
        this.zipHeader.setCentralDirectoriesSize(zip64Header.getCentralDirectoriesSize())
        this.zipHeader.setCentralDirectoriesOffsetWithStartingDisk(zip64Header.getCentralDirectoriesOffsetWithStartingDisk())
    }

    _readEntries = async () => {

        if (this.entries)
            return this.entries

        const start = this.zipHeader.getCentralDirectoriesOffsetWithStartingDisk()
        const end = this.zipHeader.getCentralDirectoriesOffsetWithStartingDisk() + this.zipHeader.getCentralDirectoriesSize() - 1

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

    testArchive = async () => {

        const entries = await this._readEntries()

        const end = this.zipHeader.getCentralDirectoriesOffsetWithStartingDisk() - 1

        await this.file.open()
        let fileReader = this.file.createReadStream(0, end)

        for (let i=0; i < entries.length; i++) {

            const fileReaderPos = fileReader.start + fileReader.bytesRead - fileReader.readableLength

            if (fileReaderPos !== entries[i].header.getOffsetOfLocalHeader()) {

                const start = entries[i].header.getOffsetOfLocalHeader()
                fileReader = this.file.createFdReadStream(start, end)
            }

            await entries[i]._test(fileReader)
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

        const entries = await this._readEntries()
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()

        await this.file.open()
        let fileReader = this.file.createFdReadStream(0, end)

        for (let i=0; i < entries.length; i++) {

            const fileReaderPos = fileReader.start + fileReader.bytesRead - fileReader.readableLength

            if (fileReaderPos !== entries[i].header.getOffsetOfLocalHeader()) {

                console.log('keke')
                const start = entries[i].header.getOffsetOfLocalHeader()
                fileReader = this.file.createFdReadStream(start, end)
            }

            await entries[i]._extract(outputPath, fileReader)
        }

        await this.file.close()
    }

    extractByRegex = async (regex, path) => {

        const entries = (await this._readEntries()).filter((obj) => obj.getFilename().test(regex))

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractFile = async (filename, path) => {

        const entries = (await this._readEntries()).filter((obj) => obj.getFilename() === filename)

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    getEntries = async () => {

        return await this._readEntries()
    }
}

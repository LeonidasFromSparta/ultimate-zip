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
    }

    _decodeZipHeader = () => {

        this.file.openSync()
        this._decodeZip32Header()

        const zip64Locator = this._decodeZip64Locator()

        if (zip64Locator) {

            const offset = zip64Locator.getOffsetZip64Header()
            this._decodeZip64Header(offset)
        }

        this.file.closeSync()
    }

    _decodeZip32Header = (decoder = new Zip32HeaderDecoder()) => {

        const size = this.file.getFileSize()
        const bytes = this.file.readBytesSync((size - END_MAX) < 0 ? 0 : size - END_MAX, size)

        this.zipHeader = decoder.decode(bytes, size)
    }

    _decodeZip64Locator = (decoder = new Zip64LocatorDecoder()) => {

        const start = this.zipHeader.getHeaderOffset() - ELO_HDR
        const end = this.zipHeader.getHeaderOffset()

        return decoder.decode(this.file.readBytesSync(start, end))
    }

    _decodeZip64Header = (startPos, decoder = new Zip64HeaderDecoder()) => {

        const zip64Header = decoder.decode(this.file.readBytesSync(startPos, startPos + 48))

        this.zipHeader.setCentralDirectoriesNumber(zip64Header.getCentralDirectoriesNumber())
        this.zipHeader.setCentralDirectoriesSize(zip64Header.getCentralDirectoriesSize())
        this.zipHeader.setCentralDirectoriesOffset(zip64Header.getCentralDirectoriesOffset())
    }

    _readEntries = async () => {

        const start = this.zipHeader.getCentralDirectoriesOffset()
        const end = this.zipHeader.getCentralDirectoriesOffset() + this.zipHeader.getCentralDirectoriesSize() - 1

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

        const entries = await this.getEntries()

        const end = this.zipHeader.getCentralDirectoriesOffset() - 1

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

        const entries = await this.getEntries()

        for (let i=0; i < entries.length; i++) {

            if (entries[i].header.getFileName() === fileName) {

                await entries[i]._test()
                break
            }
        }
    }

    extractArchive = async (outputPath) => {

        const entries = await this.getEntries()
        const end = this.zipHeader.getCentralDirectoriesOffset()

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

        const entries = (await this.getEntries()).filter((obj) => obj.getFilename().test(regex))

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractFile = async (filename, path) => {

        const entries = (await this.getEntries()).filter((obj) => obj.getFilename() === filename)

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    getEntries = async () => {

        if (!this.zipHeader) {

            await this._decodeZipHeader()
            return await this._readEntries()
        }

        return this.entries
    }
}

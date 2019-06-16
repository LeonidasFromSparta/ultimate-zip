import {EOL} from 'os'
import File from './file'
import Entry from './entry'
import Zip32HeaderDecoder from './zip-32-header-decoder'
import Zip32HeaderInfo from './zip-32-header-info'
import CentralHeaderDecoder from './central-header-decoder'
import LocalHeaderDecoder from './local-header-decoder'
import Zip64LocatorDecoder from './zip64-locator-decoder'
import {END_MAX} from './constants'

export default class UZip {

    constructor(path) {

        this.file = new File(path)

        this.type = 32
        const decoder = new Zip32HeaderDecoder()
        const chunk1 = decoder.update(this.file.readEndBytesSync(END_MAX))
        this.zip32Header = decoder.decode()

        const zip64LocatorDecoder = new Zip64LocatorDecoder()
        const chunk2 = zip64LocatorDecoder.update(chunk1)

        if (!chunk2)
            return

        this.type = 64
        this.zip64Locator = zip64LocatorDecoder.decode()

        debugger
    }

    testArchive = async () => {

        const entries = await this._readEntries()
        const decoder = new LocalHeaderDecoder()
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()

        await this.file.open()
        let fileReader = this.file.createFdReadStream(0, end)

        for (let i=0; i < entries.length; i++) {

            const fileReaderPos = fileReader.start + fileReader.bytesRead - fileReader.readableLength

            if (fileReaderPos !== entries[i].header.getOffsetOfLocalFileHeader()) {

                console.log('chanjig')
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

        const start = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip32Header.getCentralDirectoriesSize() - 1

        const readStream = this.file.createReadStream(start, end)

        const promise = new Promise((resolve) => {

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

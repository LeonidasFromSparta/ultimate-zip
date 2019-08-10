import File from './file'
import Entry from './entry-api'
import {readCenDir, readCenDirSync} from './headers'
import zipHeaderDecoder from './zip-header-decoders'

export default class UZip {

    constructor(path, file = new File(path)) {

        debugger
        this.file = file
    }

    _decodeZipHeader = () => {

        this.zipHeader = zipHeaderDecoder(this.file)
    }

    testArchive = async () => {

        const entries = await this.getEntries()

        await this.file.open()

        for (let i=0; i < entries.length; i++)
            await entries[i].test()

        await this.file.close()
    }

    testArchiveSync = () => {

        const entries = this.getEntriesSync()

        this.file.openSync()

        for (let i=0; i < entries.length; i++)
            entries[i].testSync()

        this.file.closeSync()
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

    extractArchive = async (path) => {

        const entries = await this.getEntries()

        await this.file.open()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        await this.file.close()
    }

    extractArchiveSync = (outputPath) => {

        const entries = this.getEntriesSync()

        this.file.openSync()

        for (let i=0; i < entries.length; i++)
            entries[i].extractSync(outputPath)

        this.file.closeSync()
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

    _readEntries = async () => {

        const start = this.zipHeader.cenDirsOffset
        const length = this.zipHeader.cenDirsSize

        const entries = await readCenDir(start, length, this.file)

        return entries.map((obj) => {

            return new Entry(obj, this.file)
        })
    }

    getEntries = async () => {

        if (!this.zipHeader) {

            this._decodeZipHeader()
            this.entries = await this._readEntries()
        }

        return this.entries
    }

    _readEntriesSync = () => {

        const start = this.zipHeader.cenDirsOffset
        const length = this.zipHeader.cenDirsSize

        const entries = readCenDirSync(start, length, this.file)
        return entries.map((obj) => new Entry(obj, this.file))
    }

    getEntriesSync = () => {

        if (!this.zipHeader) {

            this._decodeZipHeader()
            this.entries = this._readEntriesSync()
        }

        return this.entries
    }
}

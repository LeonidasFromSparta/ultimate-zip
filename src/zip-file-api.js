import File from './file'
import {testArchiveSync, extractArchiveSync, getEntriesSync as _getEntriesSync} from './lib/zip-file-sync'
import {testArchive, extractArchive, getEntries as _getEntries} from './lib/zip-file'

export default class UZip {

    constructor(path) {

        this.file = new File(path)
    }

    testArchive = async () => {

        await this.file.open()

        if (!this.entries)
            this.entries = await _getEntries(this.file)

        await testArchive(this.file, this.entries)

        await this.file.close()
    }

    testArchiveSync = () => {

        this.file.openSync()

        if (!this.entries)
            this.entries = _getEntriesSync(this.file)

        testArchiveSync(this.file, this.entries)

        this.file.closeSync()
    }

    extractArchive = async (path) => {

        await this.file.open()

        if (!this.entries)
            this.entries = await _getEntries(this.file)

        await extractArchive(this.file, this.entries, path)

        await this.file.close()
    }

    extractArchiveSync = (path) => {

        this.file.openSync()

        if (!this.entries)
            this.entries = _getEntriesSync(this.file)

        extractArchiveSync(this.file, this.entries, path)

        this.file.closeSync()
    }

    getEntries = async () => {

        await this.file.open()

        if (!this.entries)
            this.entries = await _getEntries(this.file)

        await this.file.close()

        return this.entries
    }

    getEntriesSync = () => {

        this.file.openSync()

        if (!this.entries)
            this.entries = _getEntriesSync(this.file)

        this.file.closeSync()

        return this.entries
    }
}

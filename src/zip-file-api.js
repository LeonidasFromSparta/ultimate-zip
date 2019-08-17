import File from './file'
import {testArchiveSync, extractArchiveSync, getEntriesSync} from './lib/zip-file-sync'
import {testArchive, extractArchive, getEntries} from './lib/zip-file'

export default class UZip {

    constructor(path) {

        this.file = new File(path)
    }

    testArchive = async () => {

        await this.getEntries()
        await testArchive(this.file, this.entries)
    }

    testArchiveSync = () => {

        const entries = this.getEntriesSync()
        testArchiveSync(this.file, entries)
    }

    extractArchive = async (path) => {

        await this.getEntries()
        await extractArchive(this.file, this.entries, path)
    }

    extractArchiveSync = (path) => {

        this.getEntriesSync()
        extractArchiveSync(this.file, this.entries, path)
    }

    getEntries = async () => {

        if (this.entries)
            return this.entries

        this.entries = await getEntries(this.file)
        return this.entries
    }

    getEntriesSync = () => {

        if (!this.entries)
            this.entries = getEntriesSync(this.file)

        return this.entries
    }
}

import File from './file'
import {testArchiveSync, extractArchiveSync, getEntriesSync} from './lib/zip-file-sync'
import {testArchive, extractArchive, getEntries} from './lib/zip-file'

export default class UZip {

    constructor(path) {

        this.file = new File(path)
    }

    testArchive = () => {

        return this.getEntries().then((entries) => testArchive(this.file, entries))
    }

    testArchiveSync = () => {

        const entries = this.getEntriesSync()
        testArchiveSync(this.file, entries)
    }

    extractArchive = (path) => {

        return this.getEntries().then((entries) => extractArchive(this.file, entries, path))
    }

    extractArchiveSync = (path) => {

        this.getEntriesSync()
        extractArchiveSync(this.file, this.entries, path)
    }

    getEntries = () => {

        if (this.entries)
            return this.entries

        return getEntries(this.file).then((entries) => {

            this.entries = entries
            return entries
        })
    }

    getEntriesSync = () => {

        if (!this.entries)
            this.entries = getEntriesSync(this.file)

        return this.entries
    }
}

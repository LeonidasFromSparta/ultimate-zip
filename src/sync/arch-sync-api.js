import File from './../lib/file'
import {testArchiveSync, extractArchiveSync, extractByRegexSync, getEntriesSync} from './arch-sync'

export default class ArkaivSync {

    constructor(path) {

        this.file = new File(path)
        this.entries = null
    }

    testArchiveSync = () => {

        const entries = this.getEntriesSync()
        testArchiveSync(this.file, entries)
    }

    extractArchiveSync = (path) => {

        this.getEntriesSync()
        extractArchiveSync(this.file, this.entries, path)
    }

    extractByRegexSync = (path, regex) => {

        this.getEntriesSync()
        extractByRegexSync(this.file, this.entries, path, regex)
    }

    getEntriesSync = () => {

        if (this.entries === null)
            this.entries = getEntriesSync(this.file)

        return this.entries
    }
}

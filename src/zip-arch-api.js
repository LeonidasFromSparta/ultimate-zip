import File from './file'
import {testArchiveSync, extractArchiveSync, getEntriesSync} from './lib/zip-arch-sync'
import {testArchive, extractArchive, getEntries} from './lib/zip-arch'

export default class UZip {

    constructor(path) {

        this.file = new File(path)
    }

    testArchive = (callback) => {

        if (typeof callback !== 'function')
            return this.getEntries().then(() => testArchive(this.file, this.entries))

        this.getEntries().then(() => testArchive(this.file, this.entries)).then(() => callback(null)).catch((err) => callback(err))
    }

    testArchiveSync = () => {

        const entries = this.getEntriesSync()
        testArchiveSync(this.file, entries)
    }

    extractArchive = (path, callback) => {

        if (typeof callback !== 'function')
            return this.getEntries().then(() => extractArchive(this.file, this.entries, path))

        this.getEntries().then(() => extractArchive(this.file, this.entries, path)).then(() => callback(null)).catch((err) => callback(err, null))
    }

    extractArchiveSync = (path) => {

        this.getEntriesSync()
        extractArchiveSync(this.file, this.entries, path)
    }

    getEntries = (callback) => {

        if (typeof callback !== 'function') {

            if (!this.entries)
                return getEntries(this.file).then((entries) => (this.entries = entries) && entries)

            return this.entries
        }

        if (this.entries)
            callback(null, this.entries)
        else
            getEntries(this.file).then((entries) => (this.entries = entries) && callback(null, entries)).catch((err) => callback(err, null))
    }

    getEntriesSync = () => {

        if (!this.entries)
            this.entries = getEntriesSync(this.file)

        return this.entries
    }
}

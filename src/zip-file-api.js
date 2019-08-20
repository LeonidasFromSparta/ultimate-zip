import File from './file'
import {testArchiveSync, extractArchiveSync, getEntriesSync} from './lib/zip-file-sync'
import {testArchive, extractArchive, getEntries} from './lib/zip-file'

export default class UZip {

    constructor(path) {

        this.file = new File(path)
    }

    testArchive = (callback) => {

        if (!callback || typeof callback !== 'function')
            return this.getEntries().then(() => testArchive(this.file, this.entries))

        this.getEntries().then(() => testArchive(this.file, this.entries)).then(callback).catch((err) => callback(err))
    }

    testArchiveSync = () => {

        const entries = this.getEntriesSync()
        testArchiveSync(this.file, entries)
    }

    extractArchive = (path, callback) => {

        if (!callback || typeof callback !== 'function')
            return this.getEntries().then(() => extractArchive(this.file, this.entries, path))

        this.getEntries().then(() => extractArchive(this.file, this.entries, path)).then(callback).catch((err) => callback(err))
    }

    extractArchiveSync = (path) => {

        this.getEntriesSync()
        extractArchiveSync(this.file, this.entries, path)
    }

    getEntries = (callback) => {

        if (!callback) {

            if (!this.entries)
                return getEntries(this.file).then((entries) => (this.entries = entries) && entries)


            return this.entries
        }

        if (this.entries) {

            callback(undefined, this.entries)
        } else {

            getEntries(this.file).then((entries) => (this.entries = entries) && callback(undefined, entries)).catch((err) => callback(err))
        }
    }

    getEntriesSync = () => {

        if (!this.entries)
            this.entries = getEntriesSync(this.file)

        return this.entries
    }
}

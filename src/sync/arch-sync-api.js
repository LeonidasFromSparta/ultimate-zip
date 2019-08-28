import {sync} from './../lib/fs-compat'
import {testSync, extractSync} from './methods'
import {getZipHeader} from './arch-sync'
import {readCenHeaders} from './../lib/utils'
import Entry from './entry-sync-api'

export default class ArkaivSync {

    constructor(path) {

        this.path = path
        this.entries = null
    }

    testArchiveSync = () => {

        this.getEntriesSync()

        const fd = sync.openSync(this.path)

        for (const entry of this.entries)
            testSync(fd, entry.header)

        sync.closeSync(fd)
    }

    extractArchiveSync = (path) => {

        this.getEntriesSync()

        const fd = sync.openSync(this.path)

        for (const entry of this.entries)
            extractSync(fd, entry.header, path)

        sync.closeSync(fd)
    }

    extractByRegexSync = (path, regex) => {

        this.getEntriesSync()

        if (!regex instanceof RegExp)
            throw new Error(regex + ' is not a regex')

        const fd = sync.openSync(this.path)

        for (const entry of this.entries)
            if (regex.test(entry.header.fileName))
                extractSync(fd, entry.header, path)

        sync.closeSync(fd)
    }

    getEntriesSync = () => {

        if (this.entries === null) {

            const fd = sync.openSync(this.path)

            const header = getZipHeader(fd)
            const start = header.cenDirsOffset
            const length = header.cenDirsSize

            const buffer = sync.readSync(fd, start, length)
            const entries = readCenHeaders(buffer)

            sync.closeSync(fd)

            this.entries = entries.map((obj) => new Entry(obj, this.path))
        }

        return this.entries
    }
}

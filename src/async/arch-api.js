import File from './../lib/file'
import {testArchive, extractArchive, extractByRegex, getEntries} from './arch'

export default class UZip {

    constructor(path) {

        this.file = new File(path)
        this.entries = null
    }

    testArchive = (callback) => {

        if (typeof callback !== 'function')
            return this.getEntries().then(() => testArchive(this.file, this.entries))

        this.getEntries().then(() => testArchive(this.file, this.entries)).then(() => callback(null)).catch((err) => callback(err))
    }

    extractArchive = (path, callback) => {

        if (typeof callback !== 'function')
            return this.getEntries().then(() => extractArchive(this.file, this.entries, path))

        this.getEntries().then(() => extractArchive(this.file, this.entries, path)).then(() => callback(null)).catch((err) => callback(err, null))
    }

    extractByRegex = (path, regex, callback) => {

        if (typeof callback !== 'function')
            return this.getEntries().then(() => extractByRegex(this.file, this.entries, path, regex))

        this.getEntries().then(() => extractByRegex(this.file, this.entries, path, regex)).then(() => callback(null)).catch((err) => callback(err))
    }

    getEntries = (callback) => {

        if (typeof callback !== 'function') {

            if (this.entries === null)
                return getEntries(this.file).then((entries) => (this.entries = entries) && entries)

            return this.entries
        }

        if (this.entries === null)
            getEntries(this.file).then((entries) => (this.entries = entries) && callback(null, entries)).catch((err) => callback(err, null))
        else
            callback(null, this.entries)
    }
}

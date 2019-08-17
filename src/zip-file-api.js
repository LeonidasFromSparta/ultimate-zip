import File from './file'
import {testArchiveSync, extractArchiveSync, getEntriesSync} from './lib/zip-file-sync'
import {testArchive, extractArchive, getEntries} from './lib/zip-file'

export default class UZip {

    constructor(path) {

        this.file = new File(path)
    }

    testArchive = (callback) => {

        if (!callback)
            return this.getEntries().then((entries) => testArchive(this.file, entries))

        this.getEntries().then((entries) => testArchive(this.file, entries)).then(callback).catch((err) => callback(err))
    }

    testArchiveSync = () => {

        this.getEntriesSync()
        testArchiveSync(this.file, this.entries)
    }

    extractArchive = (path, callback) => {

        if (!callback)
            return this.getEntries().then((entries) => extractArchive(this.file, entries, path))

        this.getEntries().then((entries) => extractArchive(this.file, entries, path).then(callback).catch((err) => callback(err)))
    }

    extractArchiveSync = (path) => {

        this.getEntriesSync()
        extractArchiveSync(this.file, this.entries, path)
    }

    /*
    testFile = async (fileName) => {

        const entries = await this.getEntries()

        for (let i=0; i < entries.length; i++) {

            if (entries[i].header.getFileName() === fileName) {

                await entries[i]._test()
                break
            }
        }
    }
    */

    /*
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
    */

    getEntries = (callback) => {

        if (this.entries) {

            if (!callback)
                return this.entries
            else
                callback(this.entries)
        } else {

            if (!callback) {

                return getEntries(this.file).then((entries) => {

                    this.entries = entries
                    return entries
                })
            }

            getEntries(this.file).then((entries) => {

                this.entries = entries
                callback(undefined, entries)
            }).catch((err) => callback(err))
        }
    }

    getEntriesSync = () => {

        if (!this.entries)
            this.entries = getEntriesSync(this.file)

        return this.entries
    }
}

import File from './file'
import {testArchiveSync, extractArchiveSync, getEntriesSync} from './sync-lib/zip-file-sync'
import {testArchive, extractArchive, getEntries} from './lib/zip-file'

export default class UZip {

    constructor(path, file = new File(path)) {

        debugger
        this.file = file
    }

    testArchive = async () => {

        await this.getEntries()
        await testArchive(this.file, this.entries)
    }

    testArchiveSync = () => {

        this.getEntriesSync()
        testArchiveSync(this.file, this.entries)
    }

    extractArchive = async (path) => {

        await this.getEntries()
        await extractArchive(this.file, this.entries, path)
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

    getEntries = async () => {

        if (!this.entries)
            this.entries = await getEntries(this.file)

        return this.entries
    }

    getEntriesSync = () => {

        if (!this.entries)
            this.entries = getEntriesSync(this.file)

        return this.entries
    }
}

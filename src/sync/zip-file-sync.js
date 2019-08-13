import Entry from '../zip-entry-api'
import {readCenDirSync} from './file-header-sync'
import {discoverSync} from './zip-header-sync'

const testArchiveSync = (file, entries) => {

    file.openSync()

    for (let i=0; i < entries.length; i++)
        entries[i].testSync()

    file.closeSync()
}

const extractArchiveSync = (file, entries, path) => {

    file.openSync()

    for (let i=0; i < entries.length; i++)
        entries[i].extractSync(path)

    file.closeSync()
}

/*
const testFile = async (fileName) => {

    const entries = await this.getEntries()

    for (let i=0; i < entries.length; i++) {

        if (entries[i].header.getFileName() === fileName) {

            await entries[i]._test()
            break
        }
    }
}

const extractByRegex = async (regex, path) => {

    const entries = (await this.getEntries()).filter((obj) => obj.getFilename().test(regex))

    this.file.openFile()

    for (let i=0; i < entries.length; i++)
        await entries[i].extract(path)

    this.file.closeFile()
}

const extractFile = async (filename, path) => {

    const entries = (await this.getEntries()).filter((obj) => obj.getFilename() === filename)

    this.file.openFile()

    for (let i=0; i < entries.length; i++)
        await entries[i].extract(path)

    this.file.closeFile()
}
*/

const getEntriesSync = (file) => {

    const header = discoverSync(file)

    const start = header.cenDirsOffset
    const length = header.cenDirsSize

    const entries = readCenDirSync(start, length, file)
    return entries.map((obj) => new Entry(obj, file))
}

export {testArchiveSync, extractArchiveSync, getEntriesSync}

import Entry from './../zip-entry-api'
import {readCenHeaders} from './../utils'
import {discover} from './zip-header'

const testArchive = async (file, entries) => {

    await file.open()

    for (let i=0; i < entries.length; i++)
        await entries[i].test()

    await file.close()
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
*/

const extractArchive = async (file, entries, path) => {

    await file.open()

    for (let i=0; i < entries.length; i++)
        await entries[i].extract(path)

    await file.close()
}

/*
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

const getEntries = async (file) => {

    await file.open()
    const header = await discover(file)

    const start = header.cenDirsOffset
    const length = header.cenDirsSize

    const buffer = await file.read(start, length)
    const entries = readCenHeaders(buffer)
    await file.close()

    return entries.map((obj) => new Entry(obj, file))
}

export {testArchive, extractArchive, getEntries}

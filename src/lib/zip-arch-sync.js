import Entry from '../zip-entry-api'
import {readCenHeaders} from '../utils'
import {zip32HeaderDecoder, zip64LocatorDecoder, zip64HeaderDecoder} from '../decoders'

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

const extractByRegex = async (regex, path) => {

            /*
        if (!(params instanceof Array) && !(params instanceof RegExp))
            throw new Error(params + ' is not a valid regex or array')

        if (params instanceof RegExp)
            params = [params]

        for (const regex of params)
            if (regex instanceof RegExp)
                throw new Error(regex + ' is not a valid regex')
        */

    const entries = (await this.getEntries()).filter((obj) => obj.getFilename().test(regex))

    this.file.openSync()

    for (let i=0; i < entries.length; i++)
        await entries[i].extract(path)

    this.file.closeFile()
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



const extractFile = async (filename, path) => {

    const entries = (await this.getEntries()).filter((obj) => obj.getFilename() === filename)

    this.file.openFile()

    for (let i=0; i < entries.length; i++)
        await entries[i].extract(path)

    this.file.closeFile()
}
*/

import {END_MAX} from '../constants'
import {ELO_HDR} from '../constants'

const getZipHeader = (file) => {

    const size = file.getFileSizeSync()

    const h32Pos = (size - END_MAX) < 0 ? 0 : size - END_MAX

    const zip32Buffer = file.readSync(h32Pos, END_MAX)
    const header32 = zip32HeaderDecoder(zip32Buffer, size)

    const startPos = header32.headerOffset - ELO_HDR
    const locatorBuffer = file.readSync(startPos, ELO_HDR)
    const locator = zip64LocatorDecoder(locatorBuffer)

    if (locator) {

        const buffer = file.readSync(locator.zip64Offset, 48)
        return zip64HeaderDecoder(buffer)
    }

    return header32
}

const getEntriesSync = (file) => {

    file.openSync()

    const header = getZipHeader(file)
    const start = header.cenDirsOffset
    const length = header.cenDirsSize

    const buffer = file.readSync(start, length)
    const entries = readCenHeaders(buffer)

    file.closeSync()

    return entries.map((obj) => new Entry(obj, file))
}

export {testArchiveSync, extractArchiveSync, extractByRegexSync, getEntriesSync}

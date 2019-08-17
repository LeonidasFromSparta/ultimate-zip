import Entry from './../zip-entry-api'
import {readCenHeaders} from './../utils'
import {zip32HeaderDecoder, zip64LocatorDecoder, zip64HeaderDecoder} from './../decoders'

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

import {END_MAX} from '../constants'
import {ELO_HDR} from '../constants'

const getZipHeader = async (file) => {

    const size = await file.getFileSize()

    const h32Pos = (size - END_MAX) < 0 ? 0 : size - END_MAX

    const zip32Buffer = await file.read(h32Pos, END_MAX)
    const header32 = zip32HeaderDecoder(zip32Buffer, size)

    const startPos = header32.headerOffset - ELO_HDR
    const locatorBuffer = await file.read(startPos, ELO_HDR)
    const locator = zip64LocatorDecoder(locatorBuffer)

    if (locator) {

        const buffer = await file.read(locator.zip64Offset, 48)
        return zip64HeaderDecoder(buffer)
    }

    return header32
}

const getEntries = async (file) => {

    await file.open()
    const header = await getZipHeader(file)

    const start = header.cenDirsOffset
    const length = header.cenDirsSize

    const buffer = await file.read(start, length)
    const entries = readCenHeaders(buffer)
    await file.close()

    return entries.map((obj) => new Entry(obj, file))
}

export {testArchive, extractArchive, getEntries}

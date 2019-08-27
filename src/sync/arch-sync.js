import Entry from './entry-sync-api'
import {readCenHeaders} from './../lib/utils'
import {zip32HeaderDecoder, zip64LocatorDecoder, zip64HeaderDecoder} from './../lib/decoders'

export const testArchiveSync = (file, entries) => {

    file.openSync()

    for (let i=0; i < entries.length; i++)
        entries[i].testSync()

    file.closeSync()
}

export const extractArchiveSync = (file, entries, path) => {

    file.openSync()

    for (let i=0; i < entries.length; i++)
        entries[i].extractSync(path)

    file.closeSync()
}

export const extractByRegexSync = (file, entries, path, regex) => {

    if (!regex instanceof RegExp)
        throw new Error(regex + ' is not a regex')

    file.openSync()

    for (let i=0; i < entries.length; i++) {
        if (regex.test(entries[i].fileName))
            entries[i].extract(path)
    }

    file.closeSync()
}

import {END_MAX} from './../lib/constants'
import {ELO_HDR} from './../lib/constants'

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

export const getEntriesSync = (file) => {

    file.openSync()

    const header = getZipHeader(file)
    const start = header.cenDirsOffset
    const length = header.cenDirsSize

    const buffer = file.readSync(start, length)
    const entries = readCenHeaders(buffer)

    file.closeSync()

    return entries.map((obj) => new Entry(obj, file))
}

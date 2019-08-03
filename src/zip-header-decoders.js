import {END_SIG} from './constants'
import {END_CDC} from './constants'
import {END_OFF} from './constants'
import {END_ZCL} from './constants'
import {END_CDS} from './constants'
import {END_HDR} from './constants'

import {ELO_SIG} from './constants'
import {ELO_SPO} from './constants'
import {ELO_OFF} from './constants'
import {ELO_HDR} from './constants'

import {E64_SIG} from './constants'
import {E64_SPO} from './constants'
import {E64_CDN} from './constants'
import {E64_CDS} from './constants'
import {E64_OFF} from './constants'

import {END_MAX} from './constants'

import { verifySignature } from './funcz'

const findOffset = (data) => {

    for (let offset = data.length - (END_HDR - 4); offset !== -1; offset--)
        if (data.readUInt32LE(offset) === END_SIG)
            return offset

    throw (`Zip32 end of central directory record signature could not be found`)
}

const zip32HeaderDecoder = (file) => {

    const size = file.getFileSize()
    const buffer = file.readBytesSync((size - END_MAX) < 0 ? 0 : size - END_MAX, size)

    const offset = findOffset(buffer)

    return {
        cenDirsCount: buffer.readUInt16LE(offset + END_CDC),
        cenDirsSize: buffer.readUInt32LE(offset + END_CDS),
        cenDirsOffset: buffer.readUInt32LE(offset + END_OFF),
        headerOffset: size - offset,
        headerLength: END_HDR + buffer.readUInt16LE(offset + END_ZCL)
    }
}

const zip64LocatorDecoder = (file, start) => {

    const startPos = start - ELO_HDR
    const endPos = start

    const buffer = file.readBytesSync(startPos, endPos)

    if (buffer.readUInt32LE(ELO_SPO) === ELO_SIG) {

        return {
            zip64Offset: parseInt(buffer.readBigUInt64LE(ELO_OFF))
        }
    }
}

const zip64HeaderDecoder = (file, start) => {

    const buffer = file.readBytesSync(start, start + 48)

    verifySignature(buffer, E64_SPO, E64_SIG, 'Bad Zip64 header signature error')

    return {
        cenDirsCount: parseInt(buffer.readBigUInt64LE(E64_CDN)),
        cenDirsSize: parseInt(buffer.readBigUInt64LE(E64_CDS)),
        cenDirsOffset: parseInt(buffer.readBigUInt64LE(E64_OFF))
    }
}

export default (file) => {

    file.openSync()

    const header32 = zip32HeaderDecoder(file)
    const locator = zip64LocatorDecoder(file, header32.headerOffset)

    if (locator) {

        const header64 = zip64HeaderDecoder(file, locator.zip64Offset)

        file.closeSync()
        return header64
    }

    file.closeSync()
    return header32
}

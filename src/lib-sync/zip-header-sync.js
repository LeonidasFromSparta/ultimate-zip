import {END_CDC} from '../constants'
import {END_OFF} from '../constants'
import {END_ZCL} from '../constants'
import {END_CDS} from '../constants'
import {END_HDR} from '../constants'

import {ELO_SIG} from '../constants'
import {ELO_SPO} from '../constants'
import {ELO_OFF} from '../constants'
import {ELO_HDR} from '../constants'

import {E64_SIG} from '../constants'
import {E64_SPO} from '../constants'
import {E64_CDN} from '../constants'
import {E64_CDS} from '../constants'
import {E64_OFF} from '../constants'

import {END_MAX} from '../constants'

import {verifySignature, findZip32Offset} from './../utils'

const zip32HeaderDecoderSync = (file) => {

    const size = file.getFileSizeSync()
    const buffer = file.readSync(size - END_MAX, size)

    const offset = findZip32Offset(buffer)

    return {
        cenDirsCount: buffer.readUInt16LE(offset + END_CDC),
        cenDirsSize: buffer.readUInt32LE(offset + END_CDS),
        cenDirsOffset: buffer.readUInt32LE(offset + END_OFF),
        headerOffset: size - offset,
        headerLength: END_HDR + buffer.readUInt16LE(offset + END_ZCL)
    }
}

const zip64LocatorDecoderSync = (file, start) => {

    const startPos = start - ELO_HDR
    const endPos = start

    const buffer = file.readSync(startPos, endPos)

    if (buffer.readUInt32LE(ELO_SPO) === ELO_SIG) {

        return {
            zip64Offset: parseInt(buffer.readBigUInt64LE(ELO_OFF))
        }
    }
}

const zip64HeaderDecoderSync = (file, start) => {

    const buffer = file.readSync(start, start + 48)

    verifySignature(buffer, E64_SPO, E64_SIG, 'Bad Zip64 header signature error')

    return {
        cenDirsCount: parseInt(buffer.readBigUInt64LE(E64_CDN)),
        cenDirsSize: parseInt(buffer.readBigUInt64LE(E64_CDS)),
        cenDirsOffset: parseInt(buffer.readBigUInt64LE(E64_OFF))
    }
}

const discoverSync = (file) => {

    const header32 = zip32HeaderDecoderSync(file)
    const locator = zip64LocatorDecoderSync(file, header32.headerOffset)

    if (locator)
        return zip64HeaderDecoderSync(file, locator.zip64Offset)

    return header32
}

export {discoverSync}

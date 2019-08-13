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

const zip32HeaderDecoder = async (file) => {

    const size = await file.getFileSize()
    const buffer = await file.read(size - END_MAX, size)

    const offset = findZip32Offset(buffer)

    return {
        cenDirsCount: buffer.readUInt16LE(offset + END_CDC),
        cenDirsSize: buffer.readUInt32LE(offset + END_CDS),
        cenDirsOffset: buffer.readUInt32LE(offset + END_OFF),
        headerOffset: size - offset,
        headerLength: END_HDR + buffer.readUInt16LE(offset + END_ZCL)
    }
}

const zip64LocatorDecoder = async (file, start) => {

    const startPos = start - ELO_HDR
    const endPos = start

    const buffer = await file.read(startPos, endPos)

    if (buffer.readUInt32LE(ELO_SPO) === ELO_SIG) {

        return {
            zip64Offset: parseInt(buffer.readBigUInt64LE(ELO_OFF))
        }
    }
}

const zip64HeaderDecoder = async (file, start) => {

    const buffer = await file.read(start, start + 48)

    verifySignature(buffer, E64_SPO, E64_SIG, 'Bad Zip64 header signature error')

    return {
        cenDirsCount: parseInt(buffer.readBigUInt64LE(E64_CDN)),
        cenDirsSize: parseInt(buffer.readBigUInt64LE(E64_CDS)),
        cenDirsOffset: parseInt(buffer.readBigUInt64LE(E64_OFF))
    }
}

const discover = async (file) => {

    await file.open()

    const header32 = await zip32HeaderDecoder(file)
    const locator = await zip64LocatorDecoder(file, header32.headerOffset)

    if (locator) {

        const header64 = await zip64HeaderDecoder(file, locator.zip64Offset)

        await file.close()
        return header64
    }

    await file.close()
    return header32
}

export {discover}

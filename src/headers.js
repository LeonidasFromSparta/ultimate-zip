const capableOfCopying = (targetOffset, targetLength, sourceOffset, sourceLength) => targetOffset < targetLength && sourceOffset < sourceLength

export const verifySignature = (expected, observed, message) => {

    if (observed !== expected)
        throw (message)
}

export const update = (data, length) => {

    return data.slice(length)
}

import {CEN_HDR} from './constants'
export const makeCenHeaderData = () => ({array: [], maxSize: CEN_HDR})

import CenHeader from './cen-header'
import {CEN_SIG} from './constants'
import {CEN_SPO} from './constants'
import {CEN_MTD} from './constants'
import {CEN_CRC} from './constants'
import {CEN_SIC} from './constants'
import {CEN_SIU} from './constants'
import {CEN_FLE} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_ATX} from './constants'
import {CEN_OFF} from './constants'

export const cenInconstantOffsets = [CEN_FLE, CEN_ELE, CEN_CLE]
export const locInconstantOffsets = [LOC_FLE, LOC_ELE]

export const calculateLength = (data, fields, initialLength) => fields.reduce((acc, pos) => acc + data.readUInt16LE(pos), initialLength)

export const cenDecode = (buffer, index) => {

    const header = new CenHeader()
    header.checksum = buffer.readUInt32LE(index + CEN_CRC)
    header.method = buffer.readUInt16LE(index + CEN_MTD)
    header.inflatedSize = buffer.readUInt32LE(index + CEN_SIC)
    header.deflatedSize = buffer.readUInt32LE(index + CEN_SIU)
    header.externalFileAttrs = buffer.readUInt32LE(index + CEN_ATX)
    header.localOffset = buffer.readUInt32LE(index + CEN_OFF)

    const nameLen = buffer.readUInt16LE(index + CEN_FLE)
    header.fileName = buffer.toString('utf8', index + CEN_HDR, index + CEN_HDR + nameLen)

    const extraLen = buffer.readUInt16LE(index + CEN_ELE)
    const extraBuf = Buffer.allocUnsafe(extraLen)
    buffer.copy(extraBuf, 0, index + CEN_HDR + nameLen, index + CEN_HDR + nameLen + extraLen)

    for (let offset=0; offset < extraBuf.length; offset++) {

        const headerId = extraBuf.readUInt16LE(offset)
        offset += 2
        const dataSize = extraBuf.readUInt16LE(offset)
        offset += 2

        if (headerId === 0x0001) {

            if (header.inflatedSize === 0xFFFFFFFF) {

                header.inflatedSize = parseInt(extraBuf.readBigUInt64LE(offset))
                offset += 8
            }

            if (header.deflatedSize === 0xFFFFFFFF) {

                header.deflatedSize = parseInt(extraBuf.readBigUInt64LE(offset))
                offset += 8
            }

            if (header.localOffset === 0xFFFFFFFF) {

                header.localOffset = parseInt(extraBuf.readBigUInt64LE(offset))
                offset += 8
            }

            break
        }

        offset += dataSize
    }

    return header
}

import {LOC_HDR} from './constants'
export const makeLocHeaderData = () => ({array: [], maxSize: LOC_HDR})

import {LOC_SIG} from './constants'
import {LOC_SPO} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'

export const calcLocLength = (idx, data) => {

    switch (idx) {

        case LOC_SPO + 1:
            return 0

        case LOC_FLE + 1:
            return data[LOC_FLE] | data[LOC_FLE + 1] << 8

        case LOC_ELE + 1:
            return data[LOC_ELE] | data[LOC_ELE + 1] << 8

        default:
            return 0
    }
}

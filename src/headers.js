const capableOfCopying = (targetOffset, targetLength, sourceOffset, sourceLength) => targetOffset < targetLength && sourceOffset < sourceLength

export const verifySignature = (buffer, pos, expected, message) => {

    const signature = buffer.readUInt32LE(pos)

    if (signature !== expected)
        throw (message)
}

export const update = (data, headerData, lengthUpdater) =>  {

    let dataOff = 0

    while (capableOfCopying(headerData.array.length, headerData.maxSize, dataOff, data.length)) {

        headerData.array.push(data[dataOff++])
        headerData.maxSize += lengthUpdater(headerData.array.length, headerData.array)
    }

    return data.slice(dataOff)
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

export const updateCenLength = (offset, data) => {

    switch (offset - 1) {

        case CEN_SPO + 1:
            return 0

        case CEN_FLE + 1:
            return (data[CEN_FLE] | data[CEN_FLE + 1] << 8)

        case CEN_ELE + 1:
            return (data[CEN_ELE] | data[CEN_ELE + 1] << 8)

        case CEN_CLE + 1:
            return (data[CEN_CLE] | data[CEN_CLE + 1] << 8)

        default:
            return 0
    }
}

export const cenDecode = (headerData) => {

    const buffer = Buffer.from(headerData.array)

    const header = new CenHeader()
    header.checksum = buffer.readUInt32LE(CEN_CRC)
    header.method = buffer.readUInt16LE(CEN_MTD)
    header.inflatedSize = buffer.readUInt32LE(CEN_SIC)
    header.deflatedSize = buffer.readUInt32LE(CEN_SIU)
    header.externalFileAttrs = buffer.readUInt32LE(CEN_ATX)
    header.localOffset = buffer.readUInt32LE(CEN_OFF)

    const nameLen = buffer.readUInt16LE(CEN_FLE)
    header.fileName = buffer.toString('utf8', CEN_HDR, CEN_HDR + nameLen)

    const extraLen = buffer.readUInt16LE(CEN_ELE)
    const extraBuf = Buffer.allocUnsafe(extraLen)
    buffer.copy(extraBuf, 0, CEN_HDR + nameLen, CEN_HDR + nameLen + extraLen)

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

export const updateLocLength = (offset, data) => {

    switch (offset - 1) {

        case LOC_SPO + 1:
            return 0

        case LOC_FLE + 1:
            return (data[LOC_FLE] | data[LOC_FLE + 1] << 8)

        case LOC_ELE + 1:
            return (data[LOC_ELE] | data[LOC_ELE + 1] << 8)

        default:
            return 0
    }
}


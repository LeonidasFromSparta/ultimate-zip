export const capableOfCopying = (targetLength, targetMaxLength, sourceOff, sourceLength) => targetLength < targetMaxLength && sourceOff < sourceLength

export const copy = (target, targetOff, source) => {

    let sourceOff = 0

    while (capableOfCopying(targetOff, target.length, sourceOff, source.length))
        target[targetOff++] = source[sourceOff++]

    return sourceOff
}

export const verifySignature = (buffer, pos, expected, message) => {

    const signature = buffer.readUInt32LE(pos)

    if (signature !== expected)
        throw (message)
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

export const cenUpdate = (data, headerData) => {

    let dataOff = 0

    while (capableOfCopying(headerData.array.length, headerData.maxSize, dataOff, data.length)) {

        headerData.array.push(data[dataOff++])

        switch (headerData.array.length - 1) {

            case CEN_SPO + 1:
                headerData.maxSize += 0
                break

            case CEN_FLE + 1:
                headerData.maxSize += (headerData.array[CEN_FLE] | headerData.array[CEN_FLE + 1] << 8)
                break

            case CEN_ELE + 1:
                headerData.maxSize += (headerData.array[CEN_ELE] | headerData.array[CEN_ELE + 1] << 8)
                break

            case CEN_CLE + 1:
                headerData.maxSize += (headerData.array[CEN_CLE] | headerData.array[CEN_CLE + 1] << 8)
                break
        }
    }

    return data.slice(dataOff)
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

export const locUpdate = (data, headerData) =>  {

    let dataOff = 0

    while (capableOfCopying(headerData.array.length, headerData.maxSize, dataOff, data.length)) {

        headerData.array.push(data[dataOff++])

        switch (headerData.array.length - 1) {

            case LOC_SPO + 1:
                headerData.maxSize += 0
                break

            case LOC_FLE + 1:
                headerData.maxSize += (headerData.array[LOC_FLE] | headerData.array[LOC_FLE + 1] << 8)
                break

            case LOC_ELE + 1:
                headerData.maxSize += (headerData.array[LOC_ELE] | headerData.array[LOC_ELE + 1] << 8)
                break
        }
    }

    return data.slice(dataOff)
}

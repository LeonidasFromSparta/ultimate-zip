import {CEN_HDR} from './constants'
import {CEN_SIG} from './constants'
import {CEN_MTD} from './constants'
import {CEN_CRC} from './constants'
import {CEN_SIC} from './constants'
import {CEN_SIU} from './constants'
import {CEN_FLE} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_ATX} from './constants'
import {CEN_OFF} from './constants'

const verifySignature = (expected, observed, message) => {

    if (expected !== observed)
        throw (message)
}

const cenInconstantOffsets = [CEN_FLE, CEN_ELE, CEN_CLE]
const locInconstantOffsets = [LOC_FLE, LOC_ELE]
const calculateLength = (data, fields, intial) => fields.reduce((acc, pos) => acc + data.readUInt16LE(pos), intial)

const makeCenDirsFromBuffer = (buffer) => {

    const headers = []

    while (CEN_HDR < buffer.length) {

        const length = calculateLength(buffer, cenInconstantOffsets, CEN_HDR)

        if (buffer.length < length)
            break

        const signature = buffer.readUInt32LE(0)

        verifySignature(signature, CEN_SIG, 'cen dir sig err')

        const headerBuffer = buffer.slice(0, length)
        const header = cenDecode(headerBuffer, 0)
        headers.push(header)

        buffer = buffer.slice(length)
    }

    return headers
}

const readCenDir = async (start, length, file) => {

    const stream = file.createReadStream(start, start + length - 1)
    const headers = []

    let extra = Buffer.alloc(0)

    stream.on('readable', () => {

        while (true) {

            const chunk = stream.read()

            if (chunk === null)
                break

            if (extra.length !== 0)
                extra = Buffer.concat([extra, chunk], extra.length + chunk.length)
            else
                extra = chunk

            const hdrs = makeCenDirsFromBuffer(extra)
            let cutOffset = 0

            for (let i=0; i < hdrs.length; i++) {

                headers.push(hdrs[i])
                cutOffset += hdrs[i].length
            }

            extra = extra.slice(cutOffset)
        }
    })

    await new Promise((resolve) => stream.on('end', resolve))
    return headers
}

const readCenDirSync = (start, length, file) => {

    file.openSync()
    const headers = []

    let extra = Buffer.alloc(0)

    while (length) {

        const draft = length < 65536 ? length : 65536
        const chunk = file.readBytesSyncLength(start, draft)

        length -= draft
        start += draft

        if (extra.length !== 0)
            extra = Buffer.concat([extra, chunk], extra.length + chunk.length)
        else
            extra = chunk

        const hdrs = makeCenDirsFromBuffer(extra)
        let cutOffset = 0

        for (let i=0; i < hdrs.length; i++) {

            headers.push(hdrs[i])
            cutOffset += hdrs[i].length
        }

        extra = extra.slice(cutOffset)
    }

    file.closeSync()
    return headers
}

import {CenHeader} from './cen-header'

const cenDecode = (buffer, index) => {

    const header = new CenHeader()
    header.checksum = buffer.readUInt32LE(index + CEN_CRC)
    header.method = buffer.readUInt16LE(index + CEN_MTD)
    header.inflatedSize = buffer.readUInt32LE(index + CEN_SIU)
    header.deflatedSize = buffer.readUInt32LE(index + CEN_SIC)
    header.externalFileAttrs = buffer.readUInt32LE(index + CEN_ATX)
    header.localOffset = buffer.readUInt32LE(index + CEN_OFF)

    const nameLen = buffer.readUInt16LE(index + CEN_FLE)
    const extraLen = buffer.readUInt16LE(index + CEN_ELE)
    const commentLen = buffer.readUInt16LE(index + CEN_CLE)

    header.fileName = buffer.toString('utf8', index + CEN_HDR, index + CEN_HDR + nameLen)
    header.length = CEN_HDR + nameLen + extraLen + commentLen

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
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'

const readLocHeader = async (start, file) => {

    const hdrBuff = await file.read(start, LOC_HDR)
    return locDecode(hdrBuff, 0)
}

const readLocHeaderSync = (start, file) => {

    const hdrBuff = file.readBytesSyncLength(start, LOC_HDR)
    return locDecode(hdrBuff, 0)
}

import {LocHeader} from './cen-header'

const locDecode = (buffer, index) => {

    const nameLen = buffer.readUInt16LE(index + LOC_FLE)
    const extraLen = buffer.readUInt16LE(index + LOC_ELE)

    const header = new LocHeader()
    header.length = LOC_HDR + nameLen + extraLen

    return header
}

const __private__ = {

    verifySignature,
    calculateLength
}

export {readCenDir, readCenDirSync, readLocHeader, readLocHeaderSync, __private__}

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

const _verifySignature = (expected, observed, message) => {

    if (expected !== observed)
        throw (message)
}

const _cenInconstantOffsets = [CEN_FLE, CEN_ELE, CEN_CLE]
const _locInconstantOffsets = [LOC_FLE, LOC_ELE]
const _calculateLength = (data, fields, intial) => fields.reduce((acc, pos) => acc + data.readUInt16LE(pos), intial)

const cutCenDirsBuffers = (extra) => {

    const headers = []

    while (CEN_HDR < extra.length) {

        if (extra.length < CEN_HDR)
            break

        const length = _calculateLength(extra, _cenInconstantOffsets, CEN_HDR)

        if (extra.length < length)
            break

        const signature = extra.readUInt32LE(0)

        _verifySignature(signature, CEN_SIG, 'cen dir sig err')

        const headerBuffer = extra.slice(0, length)
        const header = cenDecode(headerBuffer, 0)
        headers.push(header)

        extra = extra.slice(length)
    }

    return headers
}

const readCenDir = async (start, length, file) => {

    const stream = file.createReadStream(start, start + length - 1)
    const headers = []

    let extra = Buffer.alloc(0)

    stream.on('readable', function() {

        let chunk

        while (null !== (chunk = this.read())) {

            extra = Buffer.concat([extra, chunk], extra.length + chunk.length)

            while (CEN_HDR < extra.length) {

                if (extra.length < CEN_HDR)
                    break

                const length = _calculateLength(extra, _cenInconstantOffsets, CEN_HDR)

                if (extra.length < length)
                    break

                const signature = extra.readUInt32LE(0)

                _verifySignature(signature, CEN_SIG, 'cen dir sig err')

                const headerBuffer = extra.slice(0, length)
                const header = cenDecode(headerBuffer, 0)
                headers.push(header)

                extra = extra.slice(length)
            }
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

        let draft

        if (length < 65536)
            draft = length
        else
            draft = 65536

        const chunk = file.readBytesSyncLength(start, draft)
        extra = Buffer.concat([extra, chunk], extra.length + chunk.length)

        length -= draft
        start += draft

        while (CEN_HDR < extra.length) {

            const length = _calculateLength(extra, _cenInconstantOffsets, CEN_HDR)

            if (extra.length < length)
                break

            const signature = extra.readUInt32LE(0)

            _verifySignature(signature, CEN_SIG, 'cen dir sig err')

            const headerBuffer = extra.slice(0, length)
            const header = cenDecode(headerBuffer, 0)
            headers.push(header)

            extra = extra.slice(length)
        }
    }

    file.closeSync()
    return headers
}

import CenHeader from './cen-header'

const cenDecode = (buffer, index) => {

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
import {LOC_SIG} from './constants'
import {LOC_SPO} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'

const locHeaderPromise = (reader) => {

    return new Promise((resolve) => {

        let addedData = Buffer.alloc(0)

        reader.on('data', (chunk) => {

            chunk = Buffer.concat([addedData, chunk], addedData.length + chunk.length)

            while (chunk.length >= LOC_HDR) {

                const length = _calculateLength(chunk, _locInconstantOffsets, LOC_HDR)

                if (chunk.length < length)
                    break

                const signature = chunk.readUInt32LE(0)
                _verifySignature(signature, LOC_SIG, 'loc dir sig err')

                reader.pause()
                reader.removeAllListeners()
                reader.unshift(chunk.slice(length))
                return resolve()
            }

            addedData = chunk
        })

        reader.resume()
    })
}

const __private__ = {

    _verifySignature,
    _calculateLength
}

export {readCenDir as readCenDirProm, readCenDirSync, locHeaderPromise, __private__}

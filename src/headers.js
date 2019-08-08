export const verifySignature = (expected, observed, message) => {

    if (expected !== observed)
        throw (message)
}

import {CEN_HDR} from './constants'
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

export const readCenDirProm = (stream) => {

    return new Promise((resolve) => {

        const headers = []
        let extra = Buffer.alloc(0)

        stream.on('readable', function() {

            let chunk

            while (null !== (chunk = this.read())) {

                extra = Buffer.concat([extra, chunk], extra.length + chunk.length)

                while (CEN_HDR < extra.length) {

                    if (extra.length < CEN_HDR)
                        break

                    const length = calculateLength(extra, cenInconstantOffsets, CEN_HDR)

                    if (extra.length < length)
                        break

                    const signature = extra.readUInt32LE(0)

                    verifySignature(signature, CEN_SIG, 'cen dir sig err')

                    const headerBuffer = extra.slice(0, length)
                    const header = cenDecode(headerBuffer, 0)
                    headers.push(header)

                    extra = extra.slice(length)
                }
            }
        })

        stream.on('end', () => resolve(headers))
    })
}

import CenHeader from './cen-header'

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
import {LOC_SIG} from './constants'
import {LOC_SPO} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'

export const locHeaderPromise = (reader) => {

    return new Promise((resolve) => {

        let addedData = Buffer.alloc(0)

        reader.on('data', (chunk) => {

            chunk = Buffer.concat([addedData, chunk], addedData.length + chunk.length)

            while (chunk.length >= LOC_HDR) {

                const length = calculateLength(chunk, locInconstantOffsets, LOC_HDR)

                if (chunk.length < length)
                    break

                const signature = chunk.readUInt32LE(0)
                verifySignature(signature, LOC_SIG, 'loc dir sig err')

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

import {CenHeader} from './headers'
import {CEN_HDR} from './constants'
import {CEN_MTD} from './constants'
import {CEN_CRC} from './constants'
import {CEN_SIC} from './constants'
import {CEN_SIU} from './constants'
import {CEN_FLE} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_ATX} from './constants'
import {CEN_OFF} from './constants'

const cenDecoder = (buffer, index) => {

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

import {LocHeader} from './headers'
import {LOC_HDR} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'

const locDecoder = (buffer, index) => {

    const nameLen = buffer.readUInt16LE(index + LOC_FLE)
    const extraLen = buffer.readUInt16LE(index + LOC_ELE)

    const header = new LocHeader()
    header.length = LOC_HDR + nameLen + extraLen

    return header
}

export {cenDecoder, locDecoder}

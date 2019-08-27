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

    const extraBuf = Buffer.alloc(extraLen)
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

import {END_SIG} from './constants'

import {verifySignature} from './utils'

const findZip32Offset = (buffer) => {

    for (let offset = buffer.length - (END_HDR - 4); offset !== -1; offset--)
        if (buffer.readUInt32LE(offset) === END_SIG)
            return offset

    throw (`Zip32 end of central directory record signature could not be found`)
}

const zip32HeaderDecoder = (buffer, size) => {

    const offset = findZip32Offset(buffer)

    return {
        cenDirsCount: buffer.readUInt16LE(offset + END_CDC),
        cenDirsSize: buffer.readUInt32LE(offset + END_CDS),
        cenDirsOffset: buffer.readUInt32LE(offset + END_OFF),
        headerOffset: size - offset,
        headerLength: END_HDR + buffer.readUInt16LE(offset + END_ZCL)
    }
}

const zip64LocatorDecoder = (buffer) => {

    if (buffer.readUInt32LE(ELO_SPO) === ELO_SIG) {

        return {
            zip64Offset: parseInt(buffer.readBigUInt64LE(ELO_OFF))
        }
    }
}

const zip64HeaderDecoder = (buffer) => {

    verifySignature(buffer, E64_SPO, E64_SIG, 'Bad Zip64 header signature error')

    return {
        cenDirsCount: parseInt(buffer.readBigUInt64LE(E64_CDN)),
        cenDirsSize: parseInt(buffer.readBigUInt64LE(E64_CDS)),
        cenDirsOffset: parseInt(buffer.readBigUInt64LE(E64_OFF))
    }
}

export {cenDecoder, locDecoder, zip32HeaderDecoder, zip64LocatorDecoder, zip64HeaderDecoder}

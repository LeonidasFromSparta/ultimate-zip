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
import {CEN_HDR} from './constants'
import {capableOfCopying} from './funcz'

const CenHeaderDecoder = function() {

    this._array = []
    this._maxSize = CEN_HDR
}

CenHeaderDecoder.prototype.update = function(data) {

    let dataOff = 0

    while (capableOfCopying(this._array.length, this._maxSize, dataOff, data.length)) {

        this._array.push(data[dataOff++])

        switch (this._array.length - 1) {

            case CEN_SPO + 1:
                this._maxSize += 0
                break

            case CEN_FLE + 1:
                this._maxSize += (this._array[CEN_FLE] | this._array[CEN_FLE + 1] << 8)
                break

            case CEN_ELE + 1:
                this._maxSize += (this._array[CEN_ELE] | this._array[CEN_ELE + 1] << 8)
                break

            case CEN_CLE + 1:
                this._maxSize += (this._array[CEN_CLE] | this._array[CEN_CLE + 1] << 8)
                break

        }
    }

    return data.slice(dataOff)
}

CenHeaderDecoder.prototype.decode = function() {

    this._array = Buffer.from(this._array)

    const header = new CenHeader()
    header.checksum = this._array.readUInt32LE(CEN_CRC)
    header.method = this._array.readUInt16LE(CEN_MTD)
    header.inflatedSize = this._array.readUInt32LE(CEN_SIC)
    header.deflatedSize = this._array.readUInt32LE(CEN_SIU)
    header.externalFileAttrs = this._array.readUInt32LE(CEN_ATX)
    header.localOffset = this._array.readUInt32LE(CEN_OFF)

    const nameLen = this._array.readUInt16LE(CEN_FLE)
    header.fileName = this._array.toString('utf8', CEN_HDR, CEN_HDR + nameLen)

    const extraLen = this._array.readUInt16LE(CEN_ELE)
    const extraBuf = Buffer.allocUnsafe(extraLen)
    this._array.copy(extraBuf, 0, CEN_HDR + nameLen, CEN_HDR + nameLen + extraLen)

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

export default CenHeaderDecoder

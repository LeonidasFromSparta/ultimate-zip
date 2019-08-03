import CenHeader from './cen-header'
import {CEN_SIG} from './constants'
import {CEN_SPO} from './constants'
import {CEN_VEM} from './constants'
import {CEN_PLM} from './constants'
import {CEN_VER} from './constants'
import {CEN_PLT} from './constants'
import {CEN_FLG} from './constants'
import {CEN_MTD} from './constants'
import {CEN_TIM} from './constants'
import {CEN_DAT} from './constants'
import {CEN_CRC} from './constants'
import {CEN_SIC} from './constants'
import {CEN_SIU} from './constants'
import {CEN_FLE} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_DSK} from './constants'
import {CEN_ATT} from './constants'
import {CEN_ATX} from './constants'
import {CEN_OFF} from './constants'
import {CEN_HDR} from './constants'
import {copy, verifySignature} from './funcz'

export default class CentralHeaderDecoder {

    _buffer = Buffer.alloc(CEN_HDR)
    _offset = 0

    _extraBuffer = Buffer.alloc(0)
    _extraOffset = 0

    _nameLen = 0
    _extraLen = 0
    _commentLen = 0

    update = (data) => this._cacheVolatileHeader(this._cacheFixedHeader(data))

    _cacheFixedHeader = (data) => {

        const bytesCopied = copy(this._buffer, this._offset, data)
        this._offset += bytesCopied

        this._beforeVolatileHeader()

        return data.slice(bytesCopied)
    }

    _fixedHeaderDoneOnce = () => this._offset === this._buffer.length && this._extraOffset === 0

    _cacheVolatileHeader = (data) => {

        const bytesCopied = copy(this._extraBuffer, this._extraOffset, data)
        this._extraOffset += bytesCopied

        return data.slice(bytesCopied)
    }

    _beforeVolatileHeader = () => {

        if (this._fixedHeaderDoneOnce()) {

            verifySignature(this._buffer, CEN_SPO, CEN_SIG, 'Bad central file header signature error')
            this._calcVolatileHeader()
        }
    }

    _calcVolatileHeader = () => {

        this._nameLen = this._buffer.readUInt16LE(CEN_FLE)
        this._extraLen = this._buffer.readUInt16LE(CEN_ELE)
        this._commentLen = this._buffer.readUInt16LE(CEN_CLE)

        this._extraBuffer = Buffer.alloc(this._nameLen + this._extraLen + this._commentLen)
    }

    decode = () => {

        this._buffer = Buffer.concat([this._buffer, this._extraBuffer], this._buffer.length + this._extraBuffer.length)

        const header = new CenHeader()
        header.checksum = this._buffer.readUInt32LE(CEN_CRC)
        header.method = this._buffer.readUInt16LE(CEN_MTD)
        header.inflatedSize = this._buffer.readUInt32LE(CEN_SIC)
        header.deflatedSize = this._buffer.readUInt32LE(CEN_SIU)
        header.externalFileAttrs = this._buffer.readUInt32LE(CEN_ATX)
        header.localOffset = this._buffer.readUInt32LE(CEN_OFF)
        header.fileName = this._buffer.toString('utf8', CEN_HDR, CEN_HDR + this._nameLen)

        const extraBuf = Buffer.allocUnsafe(this._extraLen)
        this._buffer.copy(extraBuf, 0, CEN_HDR + this._nameLen, CEN_HDR + this._nameLen + this._extraLen)

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
}

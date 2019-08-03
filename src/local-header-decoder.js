import {LOC_SIG} from './constants'
import {LOC_SPO} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'
import {LOC_HDR} from './constants'
import {copy, verifySignature} from './funcz'

export default class LocalHeaderDecoder {

    _buffer = Buffer.alloc(LOC_HDR)
    _offset = 0

    _extraBuffer = null
    _extraOffset = 0

    update = (data) => {

        const bytesCopied1 = copy(this._buffer, this._offset, data)
        this._offset += bytesCopied1

        data = data.slice(bytesCopied1)

        if (data.length === 0)
            return data

        this.declareVolatilePart()

        const bytesCopied2 = copy(this._extraBuffer, this._extraOffset, data)
        this._extraOffset += bytesCopied2

        return data.slice(bytesCopied2)
    }

    _fixedHeaderDoneOnce = () => this._offset === this._buffer.length && this._extraOffset === 0

    declareVolatilePart = () => {

        if (this._fixedHeaderDoneOnce()) {

            verifySignature(this._buffer, LOC_SPO, LOC_SIG, 'Bad local file header signature error')

            const nameLen = this._buffer.readUInt16LE(LOC_FLE)
            const extraLen = this._buffer.readUInt16LE(LOC_ELE)

            this._extraBuffer = Buffer.alloc(nameLen + extraLen)
        }
    }
}

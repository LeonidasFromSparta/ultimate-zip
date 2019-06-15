import CentralHeader from './central-header'
import {CEN_HDR} from './constants'
import {CEN_FLE} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'

export default class CentralHeaderDecoder {

    _buffer = Buffer.allocUnsafe(CEN_HDR + 65536 + 65536 + 65536)
    _offset = 0

    update = (chunk) => {

        if (this._offset < CEN_HDR) {

            const remainingBytes = CEN_HDR - this._offset
            const bytesRead = chunk.copy(this._buffer, this._offset, 0, remainingBytes)
            this._offset += bytesRead

            if (this._offset !== CEN_HDR)
                return null

            chunk = chunk.slice(bytesRead)

            this._nameLen = this._buffer.readUInt16LE(CEN_FLE)
            this._extraLen = this._buffer.readUInt16LE(CEN_ELE)
            this._commentLen = this._buffer.readUInt16LE(CEN_CLE)

            this.bufferLen = CEN_HDR + this._nameLen + this._extraLen + this._commentLen
        }

        const remainingBytes = this.bufferLen - this._offset
        const bytesRead = chunk.copy(this._buffer, this._offset, 0, remainingBytes)
        this._offset += bytesRead

        if (this._offset !== this.bufferLen)
            return null

        return chunk.slice(bytesRead)
    }

    decode = () => {

        this._offset = 0

        const buf = Buffer.allocUnsafe(CEN_HDR + this._nameLen + this._extraLen + this._commentLen)
        this._buffer.copy(buf, 0, 0)

        const header = new CentralHeader(buf)
        header._confirmSignature()
        return header
    }
}

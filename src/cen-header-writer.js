import {Writable} from 'stream'
import {calculateLength, cenDecode, verifySignature, cenInconstantOffsets} from './headers'
import {CEN_FLE, CEN_HDR} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_SIG} from './constants'

export default class DumpWriter extends Writable {

    _headers = []
    _addedData = Buffer.alloc(0)

    _write = (chunk, encoding, callback) => {

        chunk = Buffer.concat([this._addedData, chunk], this._addedData.length + chunk.length)

        while (chunk.length >= CEN_HDR) {

            const length = calculateLength(chunk, cenInconstantOffsets, CEN_HDR)

            if (chunk.length < length)
                break

            const signature = chunk.readUInt32LE(0)

            verifySignature(signature, CEN_SIG, 'cen dir sig err')

            const headerBuffer = chunk.slice(0, length)
            const header = cenDecode(headerBuffer, 0)
            this._headers.push(header)

            chunk = chunk.slice(length)
        }

        this._addedData = chunk
        callback()
    }

    getHeaders = () => {

        return this._headers
    }
}

import {Writable} from 'stream'
import {calculateLength, cenDecode, verifySignature} from './headers'
import {CEN_FLE, CEN_HDR} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_SIG} from './constants'

export default class DumpWriter extends Writable {

    _headers = []
    _addedData = Buffer.alloc(0)
    _fieldArray = [CEN_FLE, CEN_ELE, CEN_CLE]

    _write = (data, encoding, callback) => {

        this._addedData = Buffer.concat([this._addedData, data], this._addedData.length + data.length)

        while (this._addedData.length >= CEN_HDR) {

            const length = calculateLength(this._addedData, this._fieldArray, CEN_HDR)

            if (this._addedData.length < length)
                break

            const signature = this._addedData.readUInt32LE(0)

            verifySignature(signature, CEN_SIG, 'cen dir sig err')

            const headerBuffer = this._addedData.slice(0, length)
            const header = cenDecode(headerBuffer)
            this._headers.push(header)

            this._addedData = this._addedData.slice(length)
        }

        // console.log(this._addedData.length)
        callback()
    }

    getHeaders = () => {

        return this._headers
    }
}

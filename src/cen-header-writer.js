import {Writable} from 'stream'
import CentralHeaderDecoder from './cen-header-decoder'

export default class DumpWriter extends Writable {

    _decoder = new CentralHeaderDecoder()
    _headers = []

    _write = (chunk, encoding, callback) => {

        while (chunk.length) {

            chunk = this._decoder.update(chunk)

            if (chunk.length) {

                this._headers.push(this._decoder.decode())
                this._decoder = new CentralHeaderDecoder()
            }
        }

        callback()
    }

    getHeaders = () => {

        return this._headers
    }
}

import {Writable} from 'stream'
import CenHeaderDecoder from './cen-header-decoder'

export default class DumpWriter extends Writable {

    _decoder = new CenHeaderDecoder()
    _headers = []

    _write = (chunk, encoding, callback) => {

        while (chunk.length) {

            chunk = this._decoder.update(chunk)

            if (chunk.length) {

                this._headers.push(this._decoder.decode())
                this._decoder = new CenHeaderDecoder()
            }
        }

        callback()
    }

    getHeaders = () => {

        return this._headers
    }
}

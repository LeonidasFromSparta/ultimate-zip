import {Writable} from 'stream'
import {makeCenHeaderData, cenUpdate, cenDecode} from './headers'

export default class DumpWriter extends Writable {

    _headers = []
    header = makeCenHeaderData()

    _write = (chunk, encoding, callback) => {

        while (chunk.length) {

            chunk = cenUpdate(chunk, this.header)

            if (chunk.length) {

                this._headers.push(cenDecode(this.header))
                this.header = makeCenHeaderData()
            }
        }

        callback()
    }

    getHeaders = () => {

        return this._headers
    }
}

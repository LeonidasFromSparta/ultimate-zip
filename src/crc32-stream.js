import {Transform} from 'stream'

export default class CRC32Stream extends Transform {

    constructor(crc32) {

        super()
        this._crc32 = crc32
    }

    _transform(chunk, encoding, callback) {

        this._crc32.update(chunk)
        this.push(chunk)
        callback()
    }

    getValue = () => {

        return this._crc32.getValue()
    }
}

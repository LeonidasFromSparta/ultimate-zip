import {Transform} from 'stream'

export default class CRC32Stream extends Transform {

    constructor(crc32) {

        super()
        this.crc32 = crc32
    }

    _transform(chunk, encoding, callback) {

        this.crc32.update(chunk)
        callback()
    }
}

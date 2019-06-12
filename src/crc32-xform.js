import {Transform} from 'stream'
import CRC32 from './crc32'

export default class CRC32Xform extends Transform {

    constructor(header) {

        super()

        this.crc32 = new CRC32()
        this.header = header
    }

    _write(chunk, encoding, callback) {

        this.crc32.update(chunk)
        callback()
    }

    _flush = (callback) => {

        if (this.header.getCRC32() !== this.crc32.getValue())
            throw 'CRC32 error'

        callback()
    }
}

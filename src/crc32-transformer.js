import {Transform} from 'stream'
import CRC32 from './crc32'

export default class CRC32Transformer extends Transform {

    crc32 = new CRC32()

    _write(chunk, encoding, callback) {

        this.crc32.update(chunk)
        callback()
    }

    _final = (callback) => {

        this.push(this.crc32.getValue())
        callback()
    }
}

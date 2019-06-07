import {Transform} from 'stream'
import CRC32 from './crc32'

export default class CRC32Stream extends Transform {

    crc = new CRC32()

    _transform(chunk, encoding, callback) {

        this.crc.update(chunk)
        callback(null, chunk)
    }
}

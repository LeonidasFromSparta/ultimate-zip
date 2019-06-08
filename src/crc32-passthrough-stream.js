import {Transform} from 'stream'
import CRC32 from './crc32'

export default class CRC32PassThroughStream extends Transform {

    crc32 = new CRC32()

    _transform(chunk, encoding, callback) {

        this.crc32.update(chunk)
        callback(null, chunk)
    }

    getValue = () => {

        return this.crc32.getValue()
    }
}

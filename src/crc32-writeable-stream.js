import {Writable} from 'stream'
import CRC32 from './crc32'

export default class CRC32WriteableStream extends Writable {

    crc32 = new CRC32()

    _write(chunk, encoding, callback) {

        this.crc32.update(chunk)
        callback()
    }

    getValue = () => {

        return this.crc32.getValue()
    }
}

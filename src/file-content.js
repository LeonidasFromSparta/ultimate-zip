import {inflateRawSync} from 'zlib'
import CRC32 from './crc32'

export default class FileContent {

    constructor(length) {

        this.buffer = Buffer.allocUnsafe(length)
        this.bufferOffset = 0
    }

    addByte = (byte) => {

        this.buffer.writeUInt8(byte, this.bufferOffset++)
    }

    isDone = () => {

        if (this.bufferOffset === this.buffer.length)
            return true

        return false
    }

    extract = () => {

        if (this.buffer.length === 0)
            return

        this.buffer = inflateRawSync(this.buffer)

        console.log(keke.toString())
    }

    test = (crc32) => {

        this.buffer = inflateRawSync(this.buffer)

        if (crc32 === CRC32(this.buffer))
            console.log('kekekekeke')
    }
}

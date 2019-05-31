import {inflateRawSync} from 'zlib'
import crc32 from './crc32'

export default class FileContent {

    constructor(length) {

        this.buffer = Buffer.allocUnsafe(length)
        this.bufferOffset = 0
    }

    feedByte(byte) {

        this.buffer.writeUInt8(byte, this.bufferOffset)
        this.bufferOffset++
    }

    isContentComplete() {

        if (this.bufferOffset === this.buffer.length)
            return true

        return false
    }

    extract() {

        if (this.buffer.length === 0)
            return

        this.buffer = inflateRawSync(this.buffer)

        console.log(keke.toString())
    }

    calculateCrc32() {

        return crc32(this.buffer)
    }
}

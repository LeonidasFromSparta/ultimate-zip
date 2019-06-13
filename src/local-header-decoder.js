import LocalHeader from './local-header'
import {LOCAL_HEADER_LENGTH} from './constants'
import {OBJECT_LOCAL_HEADER_LENGTH} from './constants'

export default class LocalHeaderDecoder {

    signature = 0x04034b50

    buffer = Buffer.allocUnsafe(LOCAL_HEADER_LENGTH + 65536 + 65536)

    constructor() {

        this.reset()
    }

    reset = () => {

        this.offset = 0
        this.bufferLength = 30

        this.fileNameLength = 0
        this.extraFieldLength = 0
    }

    updateFixed = (chunk) => {

        if (!this.done) {

            const remainingBytes = this.bufferLength - this.offset
            const bytesRead = chunk.copy(this.buffer, this.offset, 0, remainingBytes)
            this.offset += bytesRead

            if (this.offset !== this.bufferLength)
                return null

            chunk = chunk.slice(bytesRead)

            this.done = true
            this.fileNameLength = this.fixedBuffer.readUInt16LE(26)
            this.extraFieldLength = this.fixedBuffer.readUInt16LE(28)
            this.bufferLength += this.fileNameLength + this.extraFieldLength
        }

        const remainingBytes = this.bufferLength - this.offset
        const bytesRead = chunk.copy(this.buffer, this.offset, 0, remainingBytes)
        this.offset += bytesRead

        if (this.offset !== this.bufferLength)
            return {done: false}

        if (this.offset === this.bufferLength)
            return null

        return chunk.slice()
    }

    decode = () => {

        const signature = this.fixedBuffer.readUInt32LE(0)

        if (this.signature !== signature)
            throw `Local file header signature could not be verified: expected ${this.signature}, actual ${signature}`

        const buffer = Buffer.allocUnsafe(OBJECT_LOCAL_HEADER_LENGTH)
        this.fixedBuffer.copy(buffer, 0, 4, 26)

        const header = new LocalHeader(buffer)

        header.setFileName(this.extraBuffer.toString('utf8', 0, this.fileNameLength))

        if (this.extraFieldLength > 0) {

            const extaFieldBuffer = Buffer.allocUnsafe(this.extraFieldLength)
            this.extraBuffer.copy(extaFieldBuffer, 0, this.fileNameLength, this.fileNameLength + this.extraFieldLength)
            header.setExtraField(extaFieldBuffer)
        }

        return header
    }
}

/*
import LocalHeader from './local-header'
import {LOCAL_HEADER_LENGTH} from './constants'
import {OBJECT_LOCAL_HEADER_LENGTH} from './constants'

export default class LocalHeaderDecoder {

    signature = 0x04034b50

    fixedBuffer = Buffer.allocUnsafe(LOCAL_HEADER_LENGTH)
    extraBuffer = Buffer.allocUnsafe(65536 + 65536)

    constructor() {

        this.reset()
    }

    reset = () => {

        this.fixedOffset = 0
        this.extraOffset = 0
        this.extraBufferActualLength = null

        this.fileNameLength = 0
        this.extraFieldLength = 0
    }

    updateFixed = (bytes) => {

        const remainingBytes = this.fixedBuffer.length - this.fixedOffset

        if (remainingBytes === 0)
            return {bytes: 0, done: true}

        const bytesToRead = bytes.length > remainingBytes ? remainingBytes : bytes.length
        bytes.copy(this.fixedBuffer, this.fixedOffset, 0, bytesToRead)
        this.fixedOffset += bytesToRead

        return {bytes: bytesToRead, done: !(this.fixedBuffer.length - this.fixedOffset)}
    }

    updateVar = (bytes) => {

        if (this.extraBufferActualLength === null) {

            this.fileNameLength = this.fixedBuffer.readUInt16LE(26)
            this.extraFieldLength = this.fixedBuffer.readUInt16LE(28)

            this.extraBufferActualLength = this.fileNameLength + this.extraFieldLength
        }

        const remainingBytes = this.extraBufferActualLength - this.extraOffset

        if (remainingBytes === 0)
            return {bytes: 0, done: true}

        const bytesToRead = bytes.length > remainingBytes ? remainingBytes : bytes.length
        bytes.copy(this.extraBuffer, this.extraOffset, 0, bytesToRead)
        this.extraOffset += bytesToRead

        return {bytes: bytesToRead, done: !(this.extraBufferActualLength - this.extraOffset)}
    }

    decode = () => {

        const signature = this.fixedBuffer.readUInt32LE(0)

        if (this.signature !== signature)
            throw `Local file header signature could not be verified: expected ${this.signature}, actual ${signature}`

        const buffer = Buffer.allocUnsafe(OBJECT_LOCAL_HEADER_LENGTH)
        this.fixedBuffer.copy(buffer, 0, 4, 26)

        const header = new LocalHeader(buffer)

        header.setFileName(this.extraBuffer.toString('utf8', 0, this.fileNameLength))

        if (this.extraFieldLength > 0) {

            const extaFieldBuffer = Buffer.allocUnsafe(this.extraFieldLength)
            this.extraBuffer.copy(extaFieldBuffer, 0, this.fileNameLength, this.fileNameLength + this.extraFieldLength)
            header.setExtraField(extaFieldBuffer)
        }

        return header
    }
}

*/

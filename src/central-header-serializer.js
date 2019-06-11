import CentralHeader from './central-header'
import {CENTRAL_HEADER_LENGTH} from './constants'
import {OBJECT_CENTRAL_HEADER_LENGTH} from './constants'

export default class CentralHeaderSerializer {

    signature = 0x02014b50

    fixedBuffer = Buffer.allocUnsafe(CENTRAL_HEADER_LENGTH)
    extraBuffer = Buffer.allocUnsafe(65536 + 65536 + 65536)

    constructor() {

        this.reset()
    }

    reset = () => {

        this.fixedOffset = 0
        this.extraOffset = 0
        this.extraBufferActualLength = null

        this.fileNameLength = 0
        this.extraFieldLength = 0
        this.fileCommentLength = 0
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

            this.fileNameLength = this.fixedBuffer.readUInt16LE(28)
            this.extraFieldLength = this.fixedBuffer.readUInt16LE(30)
            this.fileCommentLength = this.fixedBuffer.readUInt16LE(32)

            this.extraBufferActualLength = this.fileNameLength + this.extraFieldLength + this.fileCommentLength
        }

        const remainingBytes = this.extraBufferActualLength - this.extraOffset

        if (remainingBytes === 0)
            return {bytes: 0, done: true}

        const bytesToRead = bytes.length > remainingBytes ? remainingBytes : bytes.length
        bytes.copy(this.extraBuffer, this.extraOffset, 0, bytesToRead)
        this.extraOffset += bytesToRead

        return {bytes: bytesToRead, done: !(this.extraBufferActualLength - this.extraOffset)}
    }

    deserealize = () => {

        const signature = this.fixedBuffer.readUInt32LE(0)

        if (this.signature !== signature)
            throw `Central file header signature could not be verified: expected ${this.signature}, actual ${signature}`

        const buffer = Buffer.allocUnsafe(OBJECT_CENTRAL_HEADER_LENGTH)
        this.fixedBuffer.copy(buffer, 0, 4, 28)
        this.fixedBuffer.copy(buffer, 24, 34, 46)

        const header = new CentralHeader(buffer)

        header.setFileName(this.extraBuffer.toString('utf8', 0, this.fileNameLength))

        if (this.extraFieldLength > 0) {

            const extaFieldBuffer = Buffer.allocUnsafe(this.extraFieldLength)
            this.extraBuffer.copy(extaFieldBuffer, 0, this.fileNameLength, this.fileNameLength + this.extraFieldLength)
            header.setExtraField(extaFieldBuffer)
        }

        if (this.fileCommentLength > 0) {

            const start = this.fileNameLength + this.extraFieldLength
            const end = this.fileNameLength + this.extraFieldLength + this.fileCommentLength

            header.setFileComment(this.extraBuffer.toString('utf8', start, end))
        }

        return header
    }
}

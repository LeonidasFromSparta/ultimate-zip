import CentralHeader from './central-header'
import {CENTRAL_HEADER_LENGTH} from './constants'

export default class CentralHeaderSeserializer {

    signature = 0x02014b50

    fixedBuffer = Buffer.allocUnsafe(CENTRAL_HEADER_LENGTH)
    extraBuffer = Buffer.allocUnsafe(65536 + 65536 + 65536)

    constructor() {

        this.reset()
    }

    reset = () => {

        this.fixedOffset = 0
        this.extraOffset = 0
        this.extraBufferActualLength = 0

        this.fileNameLength = 0
        this.extraFieldLength = 0
        this.fileCommentLength = 0
    }

    update = (bytes) => {

        // how much i need to read more
        const fixedBufferRemainingBytes = this.fixedBuffer.length - this.fixedOffset

        if (fixedBufferRemainingBytes !== 0) {

            const bytesToRead = bytes.length > fixedBufferRemainingBytes ? fixedBufferRemainingBytes : bytes.length

            bytes.copy(this.fixedBuffer, this.fixedOffset, 0, bytesToRead)
            this.fixedOffset += bytesToRead
        }

        // if bytes are less than header fixed length OR bytes are equal to header fixed length
        if (bytes.length < fixedBufferRemainingBytes || bytes.length === fixedBufferRemainingBytes)
            return bytes.length

        if (this.extraBufferActualLength === 0) {

            this.fileNameLength = this.fixedBuffer.readUInt16LE(28)
            this.extraFieldLength = this.fixedBuffer.readUInt16LE(30)
            this.fileCommentLength = this.fixedBuffer.readUInt16LE(32)

            this.extraBufferActualLength = this.fileNameLength + this.extraFieldLength + this.fileCommentLength
        }

        const extraBufferRemainingBytes = this.extraBufferActualLength - this.extraOffset

        if (extraBufferRemainingBytes !== 0) {

            const bytesReadFixedBuffer = bytes.length > fixedBufferRemainingBytes ? fixedBufferRemainingBytes : bytes.length
            const bytesToRead = (bytes.length - bytesReadFixedBuffer) > extraBufferRemainingBytes ? extraBufferRemainingBytes : bytes.length - bytesReadFixedBuffer

            bytes.copy(this.extraBuffer, this.extraOffset, bytesReadFixedBuffer, bytesReadFixedBuffer + bytesToRead)
            this.extraOffset += bytesToRead
        }

        return fixedBufferRemainingBytes + extraBufferRemainingBytes
    }

    isDone = () => {

        return this.extraOffset === this.extraBufferActualLength
    }

    deserealize = () => {

        const signature = this.fixedBuffer.readUInt32LE(0)

        if (this.signature !== signature)
            throw `Central file header signature could not be verified: expected ${this.signature}, actual ${signature}`

        const buffer = Buffer.allocUnsafe(CentralHeader.HEADER_FIXED_LENGTH)
        this.fixedBuffer.copy(buffer, 0, 4, 28)
        this.fixedBuffer.copy(buffer, 24, 34, 46)

        const header = new CentralHeader(buffer)

        header.setFileName(this.extraBuffer.toString('utf8', 0, this.fileNameLength))

        const extraFieldLength = this.fixedBuffer.readUInt16LE(30)

        if (this.extraFieldLength > 0) {

            const extaFieldBuffer = Buffer.allocUnsafe(extraFieldLength)
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

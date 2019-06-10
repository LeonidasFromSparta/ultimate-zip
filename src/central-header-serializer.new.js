import CentralHeader from './central-header'

export default class CentralHeaderSeserializer {

    signature = 0x02014b50

    originalLength = 46
    fixedBuffer = Buffer.allocUnsafe(this.originalLength)
    extraBuffer = Buffer.allocUnsafe(65536 + 65536 + 65536)

    constructor() {

        this.reset()
    }

    reset = () => {

        this.fixedOffset = 0
        this.extraOffset = 0
        this.actualExtraLength = -1

        this.fileNameLength = 0
        this.extraFieldLength = 0
        this.fileCommentLength = 0
    }

    update = (bytes) => {

        for (let i = 0; i < bytes.length; i++) {

            if (this.fixedOffset < this.fixedBuffer.length) {

                this.fixedBuffer.writeUInt8(bytes[i], this.fixedOffset++)
                continue
            }

            if (this.actualExtraLength === -1) {

                this.fileNameLength = this.fixedBuffer.readUInt16LE(28)
                this.extraFieldLength = this.fixedBuffer.readUInt16LE(30)
                this.fileCommentLength = this.fixedBuffer.readUInt16LE(32)

                this.actualExtraLength = this.fileNameLength +  this.extraFieldLength +  this.fileCommentLength

            }

            if (this.extraOffset < this.actualExtraLength)
                this.extraBuffer.writeUInt8(bytes[i], this.extraOffset++)

            if (this.extraOffset === this.actualExtraLength)
                return i
        }

        return bytes.length
    }

    isDone = () => {

        return this.extraOffset === this.actualExtraLength
    }

    deserealize = () => {

        const signature = this.fixedBuffer.readUInt32LE(0)

        if (this.signature !== signature)
            throw `Central file header signature could not be verified: expected ${this.signature}, actual ${signature}`

        const header = new CentralHeader()

        header.setVersionMadeBy(this.fixedBuffer.readUInt8(4))
        header.setPlatformCompatibility(this.fixedBuffer.readUInt8(5))
        header.setVersionNeededToExtract(this.fixedBuffer.readUInt8(6))
        header.setPlatformNeededToExtract(this.fixedBuffer.readUInt8(7))
        header.setGeneralPurposeBitFlag(this.fixedBuffer.readUInt8(8))
        header.setCompressionMethod(this.fixedBuffer.readUInt16LE(10))
        header.setLastModFileTime(this.fixedBuffer.readUInt16LE(12))
        header.setLastModFileDate(this.fixedBuffer.readUInt16LE(14))
        header.setCRC32(this.fixedBuffer.readUInt32LE(16))
        header.setCompressedSize(this.fixedBuffer.readUInt32LE(20))
        header.setUncompressedSize(this.fixedBuffer.readUInt32LE(24))
        header.setDiskNumberStart(this.fixedBuffer.readUInt16LE(34))
        header.setInternalFileAttributes(this.fixedBuffer.readUInt16LE(36))
        header.setExternalFileAttributes(this.fixedBuffer.readUInt32LE(38))
        header.setOffsetOfLocalFileHeader(this.fixedBuffer.readUInt32LE(42))

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

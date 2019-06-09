import CentralHeader from './central-header'

export default class CentralHeaderSeserializer {

    static SIGNATURE = 0x02014b50
    static HEADER_FIXED_LENGTH = 46
    static HEADER_MAX_LENGTH = CentralHeaderSeserializer.HEADER_FIXED_LENGTH + 65536 + 65536 + 65536

    constructor() {

        this.fixedBuffer = Buffer.alloc(CentralHeaderSeserializer.HEADER_FIXED_LENGTH)
        this.fixedOffset = 0
        this.extraBuffer = null
        this.extraOffset = 0
    }

    update = (bytes) => {

        for (let i = 0; i < bytes.length; i++) {

            if (this.fixedOffset < this.fixedBuffer.length) {

                this.fixedBuffer.writeUInt8(bytes[i], this.fixedOffset++)
                continue
            }

            if (this.extraBuffer === null)
                this.extraBuffer = Buffer.alloc(this.fixedBuffer.readUInt16LE(28) + this.fixedBuffer.readUInt16LE(30) + this.fixedBuffer.readUInt16LE(32))

            if (this.extraOffset < this.extraBuffer.length)
                this.extraBuffer.writeUInt8(bytes[i], this.extraOffset++)

            if (this.extraOffset === this.extraBuffer.length)
                return
        }
    }

    isDone = () => {

        return this.extraBuffer !== null && this.extraOffset === this.extraBuffer.length
    }

    deserealize = () => {

        const signature = this.fixedBuffer.readUInt32LE(0)

        if (CentralHeaderSeserializer.SIGNATURE !== signature)
            throw `Central file header signature could not be verified: expected ${CentralHeaderSeserializer.SIGNATURE}, actual ${signature}`

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

        const fileNameLength = this.fixedBuffer.readUInt16LE(28)
        const extraFieldLength = this.fixedBuffer.readUInt16LE(30)

        header.setFileName(this.extraBuffer.toString('utf8', 0, fileNameLength))
        header.setExtraField(this.extraBuffer.slice(fileNameLength, fileNameLength + extraFieldLength))

        const fileCommentLength = this.fixedBuffer.readUInt16LE(32)

        if (fileCommentLength > 0)
            header.setFileComment(this.extraBuffer.toString('utf8', fileNameLength + extraFieldLength, fileNameLength + extraFieldLength + fileCommentLength))

        return header
    }
}

import LocalHeader from './local-header'

export default class LocalHeaderSerializer {

    static SIGNATURE = 0x04034b50
    static HEADER_FIXED_LENGTH = 30
    static HEADER_MAX_LENGTH = LocalHeaderSerializer.HEADER_FIXED_LENGTH + 65536 + 65536

    constructor() {

        this.fixedBuffer = Buffer.alloc(LocalHeaderSerializer.HEADER_FIXED_LENGTH)
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
                this.extraBuffer = Buffer.alloc(this.fixedBuffer.readUInt16LE(26) + this.fixedBuffer.readUInt16LE(28))

            if (this.extraOffset < this.extraBuffer.length)
                this.extraBuffer.writeUInt8(bytes[i], this.extraOffset++)

            if (this.extraOffset === this.extraBuffer.length)
                return
        }
    }

    isDone = () => {

        return this.extraBuffer !== null && this.extraOffset === this.extraBuffer.length
    }

    deserialize = () => {

        const signature = this.fixedBuffer.readUInt32LE(0)

        if (LocalHeaderSerializer.SIGNATURE !== signature)
            throw `Local Header signature could not be verified: expected ${LocalHeaderSerializer.SIGNATURE}, actual ${signature}`

        const header = new LocalHeader()

        header.setVersionNeededToExtract(this.fixedBuffer.readUInt8(4))
        header.setPlatformNeededToExtract(this.fixedBuffer.readUInt8(5))
        header.setGeneralPurposeBitFlag(this.fixedBuffer.readUInt16LE(6))
        header.setCompressionMethod(this.fixedBuffer.readUInt16LE(8))
        header.setLastModFileTime(this.fixedBuffer.readUInt16LE(10))
        header.setLastModFileDate(this.fixedBuffer.readUInt16LE(12))
        header.setCRC32(this.fixedBuffer.readUInt32LE(14))
        header.setCompressedSize(this.fixedBuffer.readUInt32LE(18))
        header.setUncompressedSize(this.fixedBuffer.readUInt32LE(22))

        const fileNameLength = this.fixedBuffer.readUInt16LE(26)
        header.setFileName(this.extraBuffer.toString('utf8', 0, fileNameLength))

        const extraFieldLength = this.fixedBuffer.readUInt16LE(28)

        if (extraFieldLength > 0)
            header.setExtraField(this.extraBuffer.slice(fileNameLength, fileNameLength + extraFieldLength))

        return header
    }
}

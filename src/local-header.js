import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeader {

    static HEADER_LENGTH = 21

    buffer = Buffer.alloc(LocalHeader.HEADER_LENGTH)
    fileName = ''

    getVersionNeededToExtract = () => this.buffer.readUInt8(0)
    setVersionNeededToExtract = (value) => this.buffer.writeUInt8(value, 0)

    getPlatformNeededToExtract = () => this.buffer.readUInt8(1)
    setPlatformNeededToExtract = (value) => this.buffer.writeUInt8(value, 1)

    getGeneralPurposeBitFlag = () => this.buffer.readUInt16LE(2)
    setGeneralPurposeBitFlag = (value) => this.buffer.writeUInt16LE(value, 2)

    getCompressionMethod = () => this.buffer.readUInt8(4)
    setCompressionMethod = (value) => this.buffer.writeUInt8(value, 4)

    getLastModFileTime = () => this.buffer.readUInt16LE(5)
    setLastModFileTime = (value) => this.buffer.writeUInt16LE(value, 5)

    getLastModFileDate = () => this.buffer.readUInt16LE(7)
    setLastModFileDate = (value) => this.buffer.writeUInt16LE(value, 7)

    getCRC32 = () => this.buffer.readUInt32LE(9)
    setCRC32 = (value) => this.buffer.writeUInt32LE(value, 9)

    getCompressedSize = () => this.buffer.readUInt32LE(13)
    setCompressedSize = (value) => this.buffer.writeUInt32LE(value, 13)

    getUncompressedSize = () => this.buffer.readUInt32LE(17)
    setUncompressedSize = (value) => this.buffer.writeUInt32LE(value, 17)

    getFileName = () => this.fileName
    setFileName = (value) => this.fileName = value

    getExtraField = () => this.extraField === undefined ? Buffer.alloc(0) : this.extraField
    setExtraField = (value) => this.extraField = value

    getHeaderLength = () => LocalHeaderSerializer.HEADER_FIXED_LENGTH + this.getFileName().length + this.getExtraField().length

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()
}

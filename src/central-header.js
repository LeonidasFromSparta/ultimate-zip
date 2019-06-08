import CentralHeaderSerializer from './central-header-serializer'

export default class CentralHeader {

    static HEADER_FIXED_LENGTH = 36

    buffer = Buffer.alloc(CentralHeader.HEADER_FIXED_LENGTH)
    fileName = ''
    extraField = Buffer.alloc(0)

    getVersionMadeBy = () => this.buffer.readUInt8(0)
    setVersionMadeBy = (value) => this.buffer.writeUInt8(value, 0)

    getPlatformCompatibility = () => this.buffer.readUInt8(1)
    setPlatformCompatibility = (value) => this.buffer.writeUInt8(value, 1)

    getVersionNeededToExtract = () => this.buffer.readUInt8(2)
    setVersionNeededToExtract = (value) => this.buffer.writeUInt8(value, 2)

    getPlatformNeededToExtract = () => this.buffer.readUInt8(3)
    setPlatformNeededToExtract = (value) => this.buffer.writeUInt8(value, 3)

    getGeneralPurposeBitFlag = () => this.buffer.readUInt16LE(4)
    setGeneralPurposeBitFlag = (value) => this.buffer.writeUInt16LE(value, 4)

    getCompressionMethod = () => this.buffer.readUInt8(6)
    setCompressionMethod = (value) => this.buffer.writeUInt8(value, 6)

    getLastModFileTime = () => this.buffer.readUInt16LE(8)
    setLastModFileTime = (value) => this.buffer.writeUInt16LE(value, 8)

    getLastModFileDate = () => this.buffer.readUInt16LE(10)
    setLastModFileDate = (value) => this.buffer.writeUInt16LE(value, 10)

    getCRC32 = () => this.buffer.readUInt32LE(12)
    setCRC32 = (value) => this.buffer.writeUInt32LE(value, 12)

    getCompressedSize = () => this.buffer.readUInt32LE(16)
    setCompressedSize = (value) => this.buffer.writeUInt32LE(value, 16)

    getUncompressedSize = () => this.buffer.readUInt32LE(20)
    setUncompressedSize = (value) => this.buffer.writeUInt32LE(value, 20)

    getDiskNumberStart = () => this.buffer.readUInt16LE(24)
    setDiskNumberStart = (value) => this.buffer.writeUInt16LE(value, 24)

    getInternalFileAttributes = () => this.buffer.readUInt16LE(26)
    setInternalFileAttributes = (value) => this.buffer.writeUInt16LE(value, 26)

    getExternalFileAttributes = () => this.buffer.readUInt32LE(28)
    setExternalFileAttributes = (value) => this.buffer.writeUInt32LE(value, 28)

    getOffsetOfLocalFileHeader = () => this.buffer.readUInt32LE(32)
    setOffsetOfLocalFileHeader = (value) => this.buffer.writeUInt32LE(value, 32)

    getFileName = () => this.fileName
    setFileName = (value) => this.fileName = value

    getExtraField = () => this.extraField
    setExtraField = (value) => this.extraField = value

    getFileComment = () => this.fileComment !== undefined ? this.fileComment : ''
    setFileComment = (value) => this.fileComment = value

    getHeaderLength = () => CentralHeaderSerializer.HEADER_FIXED_LENGTH + this.getFileName().length + this.getExtraField().length + this.getFileComment().length

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()
}

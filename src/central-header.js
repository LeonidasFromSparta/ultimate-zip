export default class CentralHeader {

    static HEADER_FIXED_LENGTH = 29

    buffer = Buffer.allocUnsafe(CentralHeader.HEADER_FIXED_LENGTH)
    fileName = ''
    extraField = null

    getVersionMadeBy = () => this.buffer.readUInt8(0)
    setVersionMadeBy = (value) => this.buffer.writeUInt8(value, 0)

    getPlatformCompatibility = () => this.buffer.readUInt8(1)
    setPlatformCompatibility = (value) => this.buffer.writeUInt8(value, 1)

    getVersionNeededToExtract = () => this.buffer.readUInt8(2)
    setVersionNeededToExtract = (value) => this.buffer.writeUInt8(value, 2)

    getGeneralPurposeBitFlag = () => this.buffer.readUInt16LE(3)
    setGeneralPurposeBitFlag = (value) => this.buffer.writeUInt16LE(value, 3)

    getCompressionMethod = () => this.buffer.readUInt8(5)
    setCompressionMethod = (value) => this.buffer.writeUInt8(value, 5)

    getLastModFileTime = () => this.buffer.readUInt16LE(6)
    setLastModFileTime = (value) => this.buffer.writeUInt16LE(value, 6)

    getLastModFileDate = () => this.buffer.readUInt16LE(8)
    setLastModFileDate = (value) => this.buffer.writeUInt16LE(value, 8)

    getCRC32 = () => this.buffer.readUInt32LE(10)
    setCRC32 = (value) => this.buffer.writeUInt32LE(value, 10)

    getCompressedSize = () => this.buffer.readUInt32LE(14)
    setCompressedSize = (value) => this.buffer.writeUInt32LE(value, 14)

    getUncompressedSize = () => this.buffer.readUInt32LE(18)
    setUncompressedSize = (value) => this.buffer.writeUInt32LE(value, 18)

    getDiskNumberStart = () => this.buffer.readUInt8(22)
    setDiskNumberStart = (value) => this.buffer.writeUInt8(value, 22)

    getInternalFileAttributes = () => this.buffer.readUInt8(23)
    setInternalFileAttributes = (value) => this.buffer.writeUInt8(value, 23)

    getExternalFileAttributes = () => this.buffer.readUInt8(24)
    setExternalFileAttributes = (value) => this.buffer.writeUInt8(value, 24)

    getOffsetOfLocalFileHeader = () => this.buffer.readUInt32LE(25)
    setOffsetOfLocalFileHeader = (value) => this.buffer.writeUInt32LE(value, 25)

    getFileName = () => this.fileName
    setFileName = (value) => this.fileName = value

    getExtraField = () => this.extraField
    setExtraField = (value) => this.extraField = value

    getFileComment = () => this.fileComment !== undefined ? this.fileComment : ''
    setFileComment = (value) => this.fileComment = value

    getHeaderLength = () => this.size
    setHeaderLength = (value) => this.size = value

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()
}

import {LOCAL_HEADER_LENGTH} from './constants'

export default class LocalHeader {

    constructor(buffer) {

        this.buffer = buffer
        this.fileName = ''
    }

    getVersionNeededToExtract = () => this.buffer.readUInt8(0)
    setVersionNeededToExtract = (value) => this.buffer.writeUInt8(value, 0)

    getPlatformNeededToExtract = () => this.buffer.readUInt8(1)
    setPlatformNeededToExtract = (value) => this.buffer.writeUInt8(value, 1)

    getGeneralPurposeBitFlag = () => this.buffer.readUInt16LE(2)
    setGeneralPurposeBitFlag = (value) => this.buffer.writeUInt16LE(value, 2)

    getCompressionMethod = () => this.buffer.readUInt16LE(4)
    setCompressionMethod = (value) => this.buffer.writeUInt16LE(value, 4)

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

    getFileName = () => this.fileName
    setFileName = (value) => this.fileName = value

    getExtraField = () => this.extraField === undefined ? Buffer.alloc(0) : this.extraField
    setExtraField = (value) => this.extraField = value

    getHeaderLength = () => LOCAL_HEADER_LENGTH + this.getFileName().length + this.getExtraField().length

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()
}

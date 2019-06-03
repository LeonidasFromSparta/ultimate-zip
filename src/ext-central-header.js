import CentralHeader from './central-header'

export default class ExtCentralHeader {

    #buffer
    #offset
    #centralHeader

    constructor() {

        this.#offset = 0
        this.#buffer = Buffer.allocUnsafe(CentralHeader.HEADER_MAX_LENGTH)
        this.#centralHeader = new CentralHeader(this.#buffer)
    }

    addByte = (byte) => this.#buffer.writeUInt8(byte, this.#offset++)

    isDone = () => {

        if (this.#offset >= CentralHeader.HEADER_FIXED_LENGTH)
            if (this.#offset === this.getHeaderLength())
                return true

        return false
    }

    finalize = () => {

        const newBuffer = Buffer.allocUnsafe(this.getHeaderLength())
        this.#buffer.copy(newBuffer)

        this.#centralHeader = new CentralHeader(newBuffer)

        this.#offset = 0
        this.#buffer = null
    }

    checkSignature = () => this.#centralHeader.checkSignature()

    getSignature = () => this.#centralHeader.getSignature()

    getVersionMadeBy = () => this.#centralHeader.getVersionMadeBy()

    getVersionNeededToExtract = () => this.#centralHeader.getVersionNeededToExtract()

    getGeneralPurposeBitFlag = () => this.#centralHeader.getGeneralPurposeBitFlag()

    getCompressionMethod = () => this.#centralHeader.getCompressionMethod()

    getLastModFileTime = () => this.#centralHeader.getLastModFileTime()

    getLastModFileDate = () => this.#centralHeader.getLastModFileDate()

    getCRC32 = () => this.#centralHeader.getCRC32()

    getCompressedSize = () => this.#centralHeader.getCompressedSize()

    getUncompressedSize = () => this.#centralHeader.getUncompressedSize()

    getFileNameLength = () => this.#centralHeader.getFileNameLength()

    getExtraFieldLength = () => this.#centralHeader.getExtraFieldLength()

    getFileCommentLength = () => this.#centralHeader.getFileCommentLength()

    getDiskNumberStart = () => this.#centralHeader.getDiskNumberStart()

    getInternalFileAttributes = () => this.#centralHeader.getInternalFileAttributes()

    getExternalFileAttributes = () => this.#centralHeader.getExternalFileAttributes()

    getOffsetOfLocalFileHeader = () => this.#centralHeader.getOffsetOfLocalFileHeader()

    getFileName = () => this.#centralHeader.getFileName()

    getExtraField = () => this.#centralHeader.getExtraField()

    getFileComment = () => this.#centralHeader.getFileComment()

    getHeaderLength = () => this.#centralHeader.getHeaderLength()

    isDirectory = () => this.#centralHeader.isDirectory()

    isCompressed = () => this.#centralHeader.isCompressed()

    toString = () => this.#centralHeader.toString()
}

import LocalHeader from './local-header'

export default class ExtCentralHeader {

    #buffer
    #offset
    #localHeader

    constructor() {

        this.#offset = 0
        this.#buffer = Buffer.allocUnsafe(LocalHeader.HEADER_MAX_LENGTH)
        this.#localHeader = new LocalHeader(this.#buffer)
    }

    addByte = (byte) => this.#buffer.writeUInt8(byte, this.#offset++)

    isDone = () => {

        if (this.#offset >= LocalHeader.HEADER_FIXED_LENGTH)
            if (this.#offset === this.getHeaderLength())
                return true

        return false
    }

    finalize = () => {

        const newBuffer = Buffer.allocUnsafe(this.getHeaderLength())
        this.#buffer.copy(newBuffer)

        this.#localHeader = new LocalHeader(newBuffer)

        this.#offset = 0
        this.#buffer = null
    }

    checkSignature = () => this.#localHeader.checkSignature()

    getSignature = () => this.#localHeader.getSignature()

    getVersionNeededToExtract = () => this.#localHeader.getVersionNeededToExtract()

    getGeneralPurposeBitFlag = () => this.#localHeader.getGeneralPurposeBitFlag()

    getCompressionMethod = () => this.#localHeader.getCompressionMethod()

    getLastModFileTime = () => this.#localHeader.getLastModFileTime()

    getLastModFileDate = () => this.#localHeader.getLastModFileDate()

    getCRC32 = () => this.#localHeader.getCRC32()

    getCompressedSize = () => this.#localHeader.getCompressedSize()

    getUncompressedSize = () => this.#localHeader.getUncompressedSize()

    getFileNameLength = () => this.#localHeader.getFileNameLength()

    getExtraFieldLength = () => this.#localHeader.getExtraFieldLength()

    getFileName = () => this.#localHeader.getFileName()

    getExtraField = () => this.#localHeader.getExtraField()

    getHeaderLength = () => this.#localHeader.getHeaderLength()

    toString = () => this.#localHeader.toString()
}

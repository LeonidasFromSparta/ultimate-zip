export default class LocalHeader {

    getSignature = () => this._sig
    setSignature = (value) => this._sig = value

    getVersionNeededToExtract = () => this._verExt
    setVersionNeededToExtract = (value) => this._verExt = value

    getPlatformNeededToExtract = () => this._platExt
    setPlatformNeededToExtract = (value) => this._platExt = value

    getGeneralPurposeBitFlag = () => this._flag
    setGeneralPurposeBitFlag = (value) => this._flag = value

    getCompressionMethod = () => this._method
    setCompressionMethod = (value) => this._method = value

    getLastModFileTime = () => this._time
    setLastModFileTime = (value) => this._time = value

    getLastModFileDate = () => this._date
    setLastModFileDate = (value) => this._date = value

    getCRC32 = () => this._crc
    setCRC32 = (value) => this._crc = value

    getCompressedSize = () => this._compSize
    setCompressedSize = (value) => this._compSize = value

    getUncompressedSize = () => this._uncompSize
    setUncompressedSize = (value) => this._uncompSize = value

    getFileNameLength = () => this._nameLen
    setFileNameLength = (value) => this._nameLen = value

    getExtraFieldLength = () => this._extraLen
    setExtraFieldLength = (value) => this._extraLen = value

    getFileName = () => this._name
    setFileName = (value) => this._name = value

    getExtraField = () => this._extra
    setExtraField = (value) => this._extra = value

    getHeaderLength = () => this._len
    setHeaderLength = (value) => this._len = value

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()
}

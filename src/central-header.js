import {CEN_SIG} from './constants'

export default class CentralHeader {

    getSignature = () => this._sig ? this._sig : CEN_SIG
    setSignature = (value) => this._sig = value

    getVersionMadeBy = () => this._verMade
    setVersionMadeBy = (value) => this._verMade = value

    getPlatformCompatibility = () => this._platMade
    setPlatformCompatibility = (value) => this._platMade = value

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

    getFileCommentLength = () => this._commentLen
    setFileCommentLength = (value) => this._commentLen = value

    getDiskNumberStart = () => this._disk
    setDiskNumberStart = (value) => this._disk = value

    getInternalFileAttributes = () => this._intAtt
    setInternalFileAttributes = (value) => this._intAtt = value

    getExternalFileAttributes = () => this._extAtt
    setExternalFileAttributes = (value) => this._extAtt = value

    getOffsetOfLocalFileHeader = () => this._offset
    setOffsetOfLocalFileHeader = (value) => this._offset = value

    getFileName = () => this._name
    setFileName = (value) => this._name = value

    getExtraField = () => this._extra
    setExtraField = (value) => this._extra = value

    getFileComment = () => this._comment
    setFileComment = (value) => this._comment = value

    getHeaderSize = () => this._len
    setHeaderSize = (value) => this._len = value

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()
}

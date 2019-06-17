import {E64_SIG} from './constants'

export default class Zip64Header {

    getSignature = () => this._sig ? this._sig : E64_SIG
    setSignature = (value) => this._sig = value

    getPartialHeaderSize = () => this._hdrSize
    setPartialHeaderSize = (value) => this._hdrSize = value

    getVersionMadeBy = () => this._verMade
    setVersionMadeBy = (value) => this._verMade = value

    getPlatformCompatibility = () => this._platMade
    setPlatformCompatibility = (value) => this._platMade = value

    getVersionNeededToExtract = () => this._verExt
    setVersionNeededToExtract = (value) => this._verExt = value

    getPlatformNeededToExtract = () => this._platExt
    setPlatformNeededToExtract = (value) => this._platExt = value

    getDiskNumber = () => this._disk
    setDiskNumber = (value) => this._disk = value

    getDiskNumberWithCentralDirectoriesStart = () => this._cenDirDisk
    setDiskNumberWithCentralDirectoriesStart = (value) => this._cenDirDisk = value

    getCentralDirectoriesNumberOnDisk = () => this._cenDirNumDisk
    setCentralDirectoriesNumberOnDisk = (value) => this._cenDirNumDisk = value

    getCentralDirectoriesNumber = () => this._cenDirs
    setCentralDirectoriesNumber = (value) => this._cenDirs = value

    getCentralDirectoriesSize = () => this._cenDirsSize
    setCentralDirectoriesSize = (value) => this._cenDirsSize = value

    getCentralDirectoriesOffsetWithStartingDisk = () => this._cenDirsOff
    setCentralDirectoriesOffsetWithStartingDisk = (value) => this._cenDirsOff = value

    getExtensibleData = () => this._extData
    setExtensibleData = (value) => this._extData = value

    getHeaderLength = () => this._len
    setHeaderLength = (value) => this._len = value
}

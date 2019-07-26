export default class Zip32Header {

    getCentralDirectoriesNumber = () => this._cenDirs
    setCentralDirectoriesNumber = (value) => this._cenDirs = value

    getCentralDirectoriesSize = () => this._cenDirsSize
    setCentralDirectoriesSize = (value) => this._cenDirsSize = value

    getCentralDirectoriesOffsetWithStartingDisk = () => this._cenDirsOff
    setCentralDirectoriesOffsetWithStartingDisk = (value) => this._cenDirsOff = value

    getHeaderLength = () => this._cenDirsOff
    setHeaderLength = (value) => this._length = value
}

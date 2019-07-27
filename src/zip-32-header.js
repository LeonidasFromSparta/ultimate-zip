export default class Zip32Header {

    getCentralDirectoriesNumber = () => this._cenDirs
    setCentralDirectoriesNumber = (value) => this._cenDirs = value

    getCentralDirectoriesSize = () => this._cenDirsSize
    setCentralDirectoriesSize = (value) => this._cenDirsSize = value

    getCentralDirectoriesOffset = () => this._cenDirsOff
    setCentralDirectoriesOffset = (value) => this._cenDirsOff = value

    getHeaderOffset = () => this._headerOffset
    setHeaderOffset = (value) => this._headerOffset = value

    getHeaderLength = () => this._length
    setHeaderLength = (value) => this._length = value
}

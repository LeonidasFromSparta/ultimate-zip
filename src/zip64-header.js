export default class Zip64Header {

    getCentralDirectoriesNumber = () => this._cenDirs
    setCentralDirectoriesNumber = (value) => this._cenDirs = value

    getCentralDirectoriesSize = () => this._cenDirsSize
    setCentralDirectoriesSize = (value) => this._cenDirsSize = value

    getCentralDirectoriesOffset = () => this._cenDirsOff
    setCentralDirectoriesOffset = (value) => this._cenDirsOff = value
}

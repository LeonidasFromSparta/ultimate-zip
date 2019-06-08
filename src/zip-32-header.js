import Zip32HeaderSerializer from './zip-32-header-serializer'

export default class Zip32Header {

    static HEADER_FIXED_LENGTH = 14

    buffer = Buffer.allocUnsafe(Zip32Header.HEADER_FIXED_LENGTH)

    getNumberOfThisDisk = () => this.buffer.readUInt8(0)
    setNumberOfThisDisk = (value) => this.buffer.writeUInt8(value, 0)

    getNumberOfDiskWhereCentralDirectoriesStart = () => this.buffer.readUInt8(1)
    setNumberOfDiskWhereCentralDirectoriesStart = (value) => this.buffer.writeUInt8(value, 1)

    getNumberOfCentralDirectoriesOnThisDisk = () => this.buffer.readUInt16LE(2)
    setNumberOfCentralDirectoriesOnThisDisk = (value) => this.buffer.writeUInt16LE(value, 2)

    getNumberOfCentralDirectories = () => this.buffer.readUInt16LE(4)
    setNumberOfCentralDirectories = (value) => this.buffer.writeUInt16LE(value, 4)

    getSizeOfCentralDirectories = () => this.buffer.readUInt32LE(6)
    setSizeOfCentralDirectories = (value) => this.buffer.writeUInt32LE(value, 6)

    getCentralDirectoriesOffsetWithStartingDisk = () => this.buffer.readUInt32LE(10)
    setCentralDirectoriesOffsetWithStartingDisk = (value) => this.buffer.writeUInt32LE(value, 10)

    getZipFileComment = () => this.zipComment !== undefined ? this.zipComment : ''
    setZipFileComment = (value) => this.zipComment = value

    getHeaderLength = () => Zip32HeaderSerializer.HEADER_FIXED_LENGTH + this.getZipFileComment().length
}

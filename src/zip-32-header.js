import Zip32HeaderSerializer from './zip-32-header-serializer'

export default class Zip32Header {

    static HEADER_FIXED_LENGTH = 16

    buffer = Buffer.alloc(Zip32Header.HEADER_FIXED_LENGTH)

    getNumberOfThisDisk = () => this.buffer.readUInt16LE(0)
    setNumberOfThisDisk = (value) => this.buffer.writeUInt16LE(value, 0)

    getNumberOfDiskWhereCentralDirectoriesStart = () => this.buffer.readUInt16LE(2)
    setNumberOfDiskWhereCentralDirectoriesStart = (value) => this.buffer.writeUInt16LE(value, 2)

    getNumberOfCentralDirectoriesOnThisDisk = () => this.buffer.readUInt16LE(4)
    setNumberOfCentralDirectoriesOnThisDisk = (value) => this.buffer.writeUInt16LE(value, 4)

    getNumberOfCentralDirectories = () => this.buffer.readUInt16LE(6)
    setNumberOfCentralDirectories = (value) => this.buffer.writeUInt16LE(value, 6)

    getSizeOfCentralDirectories = () => this.buffer.readUInt32LE(8)
    setSizeOfCentralDirectories = (value) => this.buffer.writeUInt32LE(value, 8)

    getCentralDirectoriesOffsetWithStartingDisk = () => this.buffer.readUInt32LE(12)
    setCentralDirectoriesOffsetWithStartingDisk = (value) => this.buffer.writeUInt32LE(value, 12)

    getZipFileComment = () => this.zipComment !== undefined ? this.zipComment : ''
    setZipFileComment = (value) => this.zipComment = value

    getHeaderLength = () => Zip32HeaderSerializer.HEADER_FIXED_LENGTH + this.getZipFileComment().length
}

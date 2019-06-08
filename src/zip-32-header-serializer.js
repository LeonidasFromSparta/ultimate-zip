import Zip32Header from './zip-32-header'

export default class Zip32HeaderSerializer {

    static SIGNATURE = 0x06054b50
    static HEADER_FIXED_LENGTH = 22
    static ZIP_COMMENT_MAX_LENGTH = 65536
    static HEADER_MAX_LENGTH = Zip32HeaderSerializer.HEADER_FIXED_LENGTH + Zip32HeaderSerializer.ZIP_COMMENT_MAX_LENGTH

    static deserealize = (buffer) => {

        let offset = -1

        for (let i = buffer.length - (Zip32HeaderSerializer.HEADER_FIXED_LENGTH - 4); i !== -1; i--)
            if (buffer.readUInt32LE(i) === Zip32HeaderSerializer.SIGNATURE)
                offset = i

        if (offset === -1)
            throw `Could not locate 'End of Central Directory Record' signature ${Zip32HeaderSerializer.SIGNATURE}`

        const zip32Header = new Zip32Header()

        zip32Header.setNumberOfThisDisk(buffer.readUInt16LE(offset + 4))
        zip32Header.setNumberOfDiskWhereCentralDirectoriesStart(buffer.readUInt16LE(offset + 6))
        zip32Header.setNumberOfCentralDirectoriesOnThisDisk(buffer.readUInt16LE(offset + 8))
        zip32Header.setNumberOfCentralDirectories(buffer.readUInt16LE(offset + 10))
        zip32Header.setSizeOfCentralDirectories(buffer.readUInt32LE(offset + 12))
        zip32Header.setCentralDirectoriesOffsetWithStartingDisk(buffer.readUInt32LE(offset + 16))

        const zipCommentLength = buffer.readUInt16LE(offset + 20)

        if (zipCommentLength > 0)
            zip32Header.setZipFileComment(buffer.toString('utf8', offset + 22, offset + 22 + zipCommentLength))

        return zip32Header
    }
}

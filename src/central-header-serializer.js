import CentralHeader from './central-header'

export default class CentralHeaderSeserializer {

    static SIGNATURE = 0x02014b50
    static HEADER_FIXED_LENGTH = 46
    static HEADER_MAX_LENGTH = CentralHeaderSeserializer.HEADER_FIXED_LENGTH + 65536 + 65536 + 65536

    static deserealize = (buffer) => {

        const signature = buffer.readUInt32LE(0)

        if (CentralHeaderSeserializer.SIGNATURE !== signature)
            throw `Central file header signature could not be verified: expected ${CentralHeaderSeserializer.SIGNATURE}, actual ${signature}`

        const centralHeader = new CentralHeader()

        centralHeader.setVersionMadeBy(buffer.readUInt8(4))
        centralHeader.setPlatformCompatibility(buffer.readUInt8(5))
        centralHeader.setVersionNeededToExtract(buffer.readUInt8(6))
        centralHeader.setPlatformNeededToExtract(buffer.readUInt8(7))
        centralHeader.setGeneralPurposeBitFlag(buffer.readUInt8(8))
        centralHeader.setCompressionMethod(buffer.readUInt16LE(10))
        centralHeader.setLastModFileTime(buffer.readUInt16LE(12))
        centralHeader.setLastModFileDate(buffer.readUInt16LE(14))
        centralHeader.setCRC32(buffer.readUInt32LE(16))
        centralHeader.setCompressedSize(buffer.readUInt32LE(20))
        centralHeader.setUncompressedSize(buffer.readUInt32LE(24))
        centralHeader.setDiskNumberStart(buffer.readUInt16LE(34))
        centralHeader.setInternalFileAttributes(buffer.readUInt16LE(36))
        centralHeader.setExternalFileAttributes(buffer.readUInt32LE(38))
        centralHeader.setOffsetOfLocalFileHeader(buffer.readUInt32LE(42))

        const fileNameLength = buffer.readUInt16LE(28)
        const extraFieldLength = buffer.readUInt16LE(30)
        const fileCommentLength = buffer.readUInt16LE(32)

        centralHeader.setFileName(buffer.toString('utf8', 46, 46 + fileNameLength))
        centralHeader.setExtraField(buffer.slice(46 + fileNameLength, 46 + fileNameLength + extraFieldLength))

        if (fileCommentLength > 0)
            centralHeader.setFileComment(buffer.toString('utf8', 46 + fileNameLength + extraFieldLength, 46 + fileNameLength + extraFieldLength + fileCommentLength))

        return centralHeader
    }
}

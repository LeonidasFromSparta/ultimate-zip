import CentralHeader2 from './central-header2'

export default class CentralHeaderDeserializer {

    static SIGNATURE = 0x02014b50
    static HEADER_FIXED_LENGTH = 46
    static HEADER_MAX_LENGTH = CentralHeaderDeserializer.HEADER_FIXED_LENGTH + 65536 + 65536 + 65536

    static deserealize = (buffer) => {

        const signature = buffer.readUInt32LE(0)

        if (CentralHeaderDeserializer.SIGNATURE !== signature)
            throw `Central file header signature could not be verified: expected ${CentralHeaderDeserializer.SIGNATURE}, actual ${signature}`

        const centralHeader2 = new CentralHeader2()

        centralHeader2.setVersionMadeBy(buffer.readUInt8(4))
        centralHeader2.setPlatformCompatibility(buffer.readUInt8(5))
        centralHeader2.setVersionNeededToExtract(buffer.readUInt8(6))
        centralHeader2.setGeneralPurposeBitFlag(buffer.readUInt8(8))
        centralHeader2.setCompressionMethod(buffer.readUInt16LE(10))
        centralHeader2.setLastModFileTime(buffer.readUInt16LE(12))
        centralHeader2.setLastModFileDate(buffer.readUInt16LE(14))
        centralHeader2.setCRC32(buffer.readUInt32LE(16))
        centralHeader2.setCompressedSize(buffer.readUInt32LE(20))
        centralHeader2.setUncompressedSize(buffer.readUInt32LE(24))
        centralHeader2.setDiskNumberStart(buffer.readUInt16LE(34))
        centralHeader2.setInternalFileAttributes(buffer.readUInt16LE(36))
        centralHeader2.setExternalFileAttributes(buffer.readUInt32LE(38))
        centralHeader2.setOffsetOfLocalFileHeader(buffer.readUInt32LE(42))

        const fileNameLength = buffer.readUInt16LE(28)
        const extraFieldLength = buffer.readUInt16LE(30)
        const fileCommentLength = buffer.readUInt16LE(32)

        centralHeader2.setFileName(buffer.toString('utf8', 46, 46 + fileNameLength))
        centralHeader2.setExtraField(buffer.slice(46 + fileNameLength, 46 + fileNameLength + extraFieldLength))

        if (fileCommentLength > 0)
            centralHeader2.setFileComment(buffer.toString('utf8', 46 + fileNameLength + extraFieldLength, 46 + fileNameLength + extraFieldLength + fileCommentLength))

        centralHeader2.setHeaderLength(CentralHeaderDeserializer.HEADER_FIXED_LENGTH + fileNameLength + extraFieldLength + fileCommentLength)

        return centralHeader2
    }
}

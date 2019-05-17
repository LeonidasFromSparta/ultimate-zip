export default class CDH {

    static BYTES_LENGTH = 46
    static SIGNATURE = 0x02014b50


    constructor(buffer) {

        debugger

        this.verifySignature(buffer)

        this.readVersionMadeBy(buffer)
        this.readVersionNeededToExtract(buffer)
        this.readGeneralPurposeBitFlag(buffer)
        this.readCompressionMethod(buffer)
        this.readLastModFileTime(buffer)
        this.readLastModFileDate(buffer)
        this.readCRC32(buffer)
        this.readCompressedSize(buffer)
        this.readUncompressedSize(buffer)
        this.readFilenameLength(buffer)
        this.readExtraFieldLength(buffer)
        this.readFileCommentLength(buffer)
        this.readDiskNumberStart(buffer)
        this.readInternalFileAttributes(buffer)
        this.readRelativeOffsetOfLocalHeader(buffer)

        this.readFilename(buffer, this.filenameLength)
        this.readExtraField(buffer, this.filenameLength, this.extraFieldLength)
        this.readFileComment(buffer, this.filenameLength + this.extraFieldLength, this.fileCommentLength)
    }

    /**
     * Verify central directory header (CDH) signature.
     * Offset 0, 4 bytes (32 bit), LE.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    verifySignature(buffer) {

        if (CDH.SIGNATURE !== buffer.readUInt32LE(0))
            console.log('kekekeke1!!!')
    }

    /**
     * Read version made by.
     * Offset 4, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readVersionMadeBy(buffer) {

        this.versionMadeBy = buffer.readUInt16BE(4)
    }

    /**
     * Read version needed to extract.
     * Offset 6, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readVersionNeededToExtract(buffer) {

        this.versionNeededToExtract = buffer.readUInt16BE(6)
    }

    /**
     * Read general purpose bit flag.
     * Offset 8, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readGeneralPurposeBitFlag(buffer) {

        this.generalPurposeBitFlag = buffer.readUInt16BE(8)
    }

    /**
     * Read compression method.
     * Offset 10, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressionMethod(buffer) {

        this.compressionMethod = buffer.readUInt16BE(10)
    }

    /**
     * Read last mod file time.
     * Offset 12, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLastModFileTime(buffer) {

        this.lastModFileTime = buffer.readUInt16BE(12)
    }

    /**
     * Read last mod file date.
     * Offset 14, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLastModFileDate(buffer) {

        this.lastModFileDate = buffer.readUInt16BE(14)
    }

    /**
     * Read crc-32.
     * Offset 16, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCRC32(buffer) {

        this.crc32 = buffer.readUInt32BE(16)
    }

    /**
     * Read compressed size.
     * Offset 20, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressedSize(buffer) {

        this.compressedSize = buffer.readUInt32BE(20)
    }

    /**
     * Read uncompressed size.
     * Offset 24, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readUncompressedSize(buffer) {

        this.uncompressedSize = buffer.readUInt32BE(24)
    }

    /**
     * Read file name length.
     * Offset 28, 2 bytes (16 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFilenameLength(buffer) {

        this.filenameLength = buffer.readUInt16LE(28)
    }

    /**
     * Read extra field length.
     * Offset 30, 2 bytes (16 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExtraFieldLength(buffer) {

        this.extraFieldLength = buffer.readUInt16LE(30)
    }

    /**
     * Read file comment length.
     * Offset 32, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileCommentLength(buffer) {

        this.fileCommentLength = buffer.readUInt16BE(32)
    }

    /**
     * Read disk number start.
     * Offset 34, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readDiskNumberStart(buffer) {

        this.diskNumberStart = buffer.readUInt16BE(34)
    }

    /**
     * Read internal file attributes.
     * Offset 36, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readInternalFileAttributes(buffer) {

        this.internalFileAttributes = buffer.readUInt16BE(36)
    }

    /**
     * Read external file attributes.
     * Offset 38, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExternalFileAttributes(buffer) {

        this.externalFileAttributes = buffer.readUInt32BE(38)
    }

    /**
     * Read relative offset of local header.
     * Offset 42, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readRelativeOffsetOfLocalHeader(buffer) {

        this.relativeOffsetOfLocalHeader = buffer.readUInt32BE(42)
    }

    /**
     * Read file name (variable size).
     * Offset 46, varchar.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} length The length of the file name.
     */
    readFilename(buffer, length) {

        this.filename = buffer.toString('utf8', 46, 46 + length)
    }

    /**
     * Read extra field (variable size).
     * Offset 46 + filename length.
     * Header ID offset 0, 2 bytes (16 bit LE). Data Size offset 2, 2 bytes (16 bit LE)
     *
     * .ZIP File Format Specification: sections 4.4.28, 4.5.1, 4.5.2
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} addedOffset The filename length additional offset.
     * @param {buffer} length The length of the extra field.
     */
    readExtraField(buffer, addedOffset, length) {

        const extraFieldBuffer = buffer.slice(46 + addedOffset, 46 + addedOffset + length)

        const headerId = `0x${extraFieldBuffer.readUInt16LE(0).toString(16).toUpperCase()}`
        const headerIdFromMap = CDH.HEADER_ID_MAPPING[headerId]

        this.mappedHeaderId = headerIdFromMap ? headerIdFromMap : `${headerId} - header id doesn't exists in .ZIP spec`
        this.dataSize = extraFieldBuffer.readUInt16LE(2)
        this.extraFieldContent = extraFieldBuffer.toString(undefined, 4)


    }

    /**
     * Read file comment (variable size).
     * Offset 46 + filename length + extra field length, variable length.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} addedOffset The file name and extra field lengths additonal offset.
     * @param {buffer} length The length of the file comment.
     */
    readFileComment(buffer, addedOffset, length) {

        this.fileComment = buffer.readUInt16BE(46 + addedOffset, length)
    }
}

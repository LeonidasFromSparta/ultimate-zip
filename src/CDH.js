export default class CDH {

    static BYTES_LENGTH = 46
    static SIGNATURE = 0x02014b50

    constructor(buffer) {

        this.verifySignature(buffer)

        this.readVersionMadeBy(buffer)
        this.readVersionNeededToExtract(buffer)
        this.readGeneralPurposeBitFlag(buffer)
        this.readCompressionMethod(buffer)
        this.readLengthOfCD(buffer)
        this.readCRC32(buffer)
        this.readCompressedSize(buffer)
        this.readComment(buffer)
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

        this.uncompressedSize = buffer.readUInt32BE(20)
    }

    /**
     * Read file name length.
     * Offset 28, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFilenameLength(buffer) {

        this.filenameLength = buffer.readUInt16BE(20)
    }

    /**
     * Read extra field length.
     * Offset 30, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExtraFieldLength(buffer) {

        this.extraFieldLength = buffer.readUInt16BE(20)
    }

    /**
     * Read file comment length.
     * Offset 32, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileCommentLength(buffer) {

        this.fileCommentLength = buffer.readUInt16BE(20)
    }

    /**
     * Read disk number start.
     * Offset 34, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readDiskNumberStart(buffer) {

        this.diskNumberStart = buffer.readUInt16BE(20)
    }

    /**
     * Read internal file attributes.
     * Offset 36, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readInternalFileAttributes(buffer) {

        this.internalFileAttributes = buffer.readUInt16BE(20)
    }

    /**
     * Read external file attributes.
     * Offset 38, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExternalFileAttributes(buffer) {

        this.externalFileAttributes = buffer.readUInt16BE(20)
    }

    /**
     * Read relative offset of local header.
     * Offset 42, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readRelativeOffsetOfLocalHeader(buffer) {

        this.relativeOffsetOfLocalHeader = buffer.readUInt16BE(20)
    }

    /**
     * Read relative offset of local header.
     * Offset 42, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} length The length of the file name.
     */
    readFilename(buffer, length) {

        this.relativeOffsetOfLocalHeader = buffer.readUInt16BE(20,)
    }
}

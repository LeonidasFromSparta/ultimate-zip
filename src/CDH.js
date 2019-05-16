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
        this.readCDOffsetWithStartingDiskNum(buffer)
        this.readCommentLength(buffer)
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
     * Read size of the central directory.
     * Offset 12, 4 bytes (32 bit), LE.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLengthOfCD(buffer) {

        this.lengthOfCD = buffer.readUInt32LE(12)
    }

    /**
     * Read offset of start of central directory with respect to the starting disk number.
     * Offset 16, 4 bytes (32 bit), LE.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCDOffsetWithStartingDiskNum(buffer) {

        this.offsetOfCDWithStartingDiskNum = buffer.readUInt32LE(16)
    }

    /**
     * Read .ZIP file comment length.
     * Offset 20, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCommentLength(buffer) {

        this.commentLength = buffer.readUInt16BE(20)
    }

    /**
     * Read .ZIP file comment.
     * Offset 22, variable size (up to 64kb).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readComment(buffer) {

        this.comment = buffer.toString('utf8', 22)
    }
}

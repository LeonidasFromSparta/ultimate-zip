export default class NTFS {

    constructor(buffer) {

        this.readTagBlockType(buffer)
        this.readSizeOfAttribute(buffer)
        this.readVersionNeededToExtract(buffer)
        this.readGeneralPurposeBitFlag(buffer)
        this.readCompressionMethod(buffer)
        this.readLastModFileTime(buffer)
        this.readLastModFileDate(buffer)
        this.readCRC32(buffer)
    }

    /**
     * Read tag for this "extra" block type.
     * Offset 0, 2 bytes (32 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readTagBlockType(buffer) {

        this.blockTypeTag = buffer.readUInt16LE(0)
    }

    /**
     * Read size of attribute in bytes.
     * Offset 2, 2 bytes (16 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readSizeOfAttribute(buffer) {

        this.sizeOfAttribute = buffer.readUInt16LE(2)
    }

    /**
     * Read file last modification time.
     * Offset 4, 8 bytes (64 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileLastModificationTime(buffer) {

        this.fileLastModificationTime = buffer.readBigUInt64LE(12)
    }

    /**
     * Read file last access time.
     * Offset 12, 8 bytes (64 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileLastAccessTime(buffer) {

        this.fileLastAccessTime = buffer.readBigUInt64LE(20)
    }

    /**
     * Read file creation time.
     * Offset 28, 8 bytes (64 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileCreationTime(buffer) {

        this.fileCreationTime = buffer.readUInt16BE(28)
    }
}

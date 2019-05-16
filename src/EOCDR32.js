import {locate_EOCDR_offset} from './zip-utils'

export default class EOCDR32 {

    static BYTES_LENGTH = 22
    static SIGNATURE = 0x06054b50
    static MAX_ENTRIES = 0xFFFF

    constructor(buffer) {

        this.verifySignature(buffer)

        this.readNumOfThisDisk(buffer)
        this.readNumOfDiskWithStartOfCD(buffer)
        this.readTotalEntriesInCDInDisk(buffer)
        this.readTotalEntriesInCD(buffer)
        this.readLengthOfCD(buffer)
        this.readCDOffsetWithStartingDiskNum(buffer)
        this.readCommentLength(buffer)
        this.readComment(buffer)
    }

    /**
     * Verify end of central directory record (EOCDR) signature.
     * Offset 0, 4 bytes (32 bit), LE.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    verifySignature(buffer) {

        if (EOCDR32.SIGNATURE !== buffer.readUInt32LE(0))
            console.log('kekekeke1!!!')
    }

    /**
     * Read number of this disk.
     * Offset 4, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readNumOfThisDisk(buffer) {

        this.numOfDisk = buffer.readUInt16BE(4)
    }

    /**
     * Read number of the disk with the start of the central directory.
     * Offset 6, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readNumOfDiskWithStartOfCD(buffer) {

        this.numOfDiskFromStartCD = buffer.readUInt16BE(6)
    }

    /**
     * Read total number of entries in the central directory on this disk.
     * Offset 8, 2 bytes (16 bit), LE.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readTotalEntriesInCDInDisk(buffer) {

        this.entriesInCDInDisk = buffer.readUInt16LE(8)
    }

    /**
     * Read total number of entries in the central directory.
     *
     * The total number of files in the .ZIP file. If an archive is in ZIP64 format and the value in this field is 0xFFFF,
     * the size will be in the corresponding 8 byte zip64 end of central directory field.
     *
     * Offset 10, 2 bytes (16 bit), LE.
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readTotalEntriesInCD(buffer) {

        this.entriesInCD = buffer.readUInt16LE(10)
    }

    /**
     * Read size of the central directory.
     *
     * The size (in bytes) of the entire central directory. If an archive is in ZIP64 format and the value in this field is 0xFFFFFFFF,
     * the size will be in the corresponding 8 byte zip64 end of central directory field.
     *
     * Offset 12, 4 bytes (32 bit), LE.
     *
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

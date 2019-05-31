export default class Zip32Header {

    static HEADER_FIXED_LENGTH = 22
    static MAX_ZIP_COMMENT_LENGTH = 65536
    static SIGNATURE = 0x06054b50

    constructor(buffer) {

        this.headerLength = buffer.length

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

        if (Zip32Header.SIGNATURE !== buffer.readUInt32LE(0))
            console.log('kekekeke1!!!')
    }

    /**
     * Read number of this disk.
     * Offset 4, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readNumOfThisDisk(buffer) {

        this.numOfDisk = buffer.readUInt16LE(4)
    }

    /**
     * Read number of the disk with the start of the central directory.
     * Offset 6, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readNumOfDiskWithStartOfCD(buffer) {

        this.numOfDiskFromCdStart = buffer.readUInt16LE(6)
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

        this.commentLength = buffer.readUInt16LE(20)
    }

    /**
     * Read zip file comment.
     * Offset 22, variable size (max 64kb).
     * @param {Buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} length The length of the file comment.
     */
    readComment(buffer, length) {

        this.comment = buffer.toString('utf8', 22)
    }

    toString() {

        let str = ''

        str += `[ END OF CENTRAL DIRECTORY ]\n`
        str += `Signature                         : 0x${Zip32Header.SIGNATURE.toString(16)}\n`
        str += `Number of this disk               : ${this.numOfDisk} (0x${this.numOfDisk.toString(16).toUpperCase()})\n`
        str += `Number of this disk from CD start : ${this.numOfDiskFromCdStart} (0x${this.numOfDiskFromCdStart.toString(16).toUpperCase()})\n`
        str += `Total entries in CD on this disk  : ${this.entriesInCDInDisk} (0x${this.entriesInCDInDisk.toString(16).toUpperCase()})\n`
        str += `Total entries in CD               : ${this.entriesInCD} (0x${this.entriesInCD.toString(16).toUpperCase()})\n`
        str += `CD size                           : ${this.lengthOfCD} (0x${this.lengthOfCD.toString(16).toUpperCase()})\n`
        str += `Starting disk CD offset           : ${this.offsetOfCDWithStartingDiskNum} (0x${this.offsetOfCDWithStartingDiskNum.toString(16).toUpperCase()})\n`
        str += `Comment length                    : ${this.commentLength} (0x${this.commentLength.toString(16).toUpperCase()})\n`
        str += `Comment                           : ${this.comment}\n`
        str += `[ END OF CENTRAL DIRECTORY LENGTH ${this.headerLength} (0x${this.headerLength.toString(16).toUpperCase()}) ]\n`

        return str
    }

    /**
     * This static method locates the start position of the 'End of Central Directory Record'.
     * @param {Buffer} buffer The buffer which should contain the header. Max header length will be 65558 bytes.
     * @returns {int} The position in which header signature located.
     */
    static locateHeaderStartPos(buffer) {

        for (let offset = buffer.length - (Zip32Header.HEADER_FIXED_LENGTH - 4); offset !== -1; offset--)
            if (buffer.readUInt32LE(offset) === Zip32Header.SIGNATURE)
                return offset

        throw `Could not locate 'End of Central Directory Record' signature ${Zip32Header.SIGNATURE}`
    }
}

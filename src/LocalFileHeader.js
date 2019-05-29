import os from 'os'
import {VERSION_MAPPING, COMPRESSION_METHOD_MAPPING} from './mappings'

export default class LFH {

    static HEADER_FIXED_LENGTH = 30
    static HEADER_MAX_VARIABLE_LENGTH = 65535 + 65535
    static SIGNATURE = 0x04034b50

    static PLATFORM_MAPPING = {

        0:  'MS-DOS and OS/2 (FAT / VFAT / FAT32 file systems)',
        1:  'Amiga',
        2:  'OpenVMS',
        3:  'UNIX',
        4:  'VM/CMS',
        5:  'Atari ST',
        6:  'OS/2 H.P.F.S.',
        7:  'Macintosh',
        8:  'Z-System',
        9:  'CP/M',
        10: 'Windows NTFS',
        11: 'MVS (OS/390 - Z/OS)',
        12: 'VSE',
        13: 'Acorn Risc',
        14: 'VFAT',
        15: 'alternate MVS',
        16: 'BeOS',
        17: 'Tandem',
        18: 'OS/400',
        19: 'OS X (Darwin)'
    }



    static GENERAL_PURPOSE_BIT_FLAG_MAPPING = {

        1:     'Bit 0',
        2:     'Bit 1',
        4:     'Bit 2',
        8:     'Bit 3',
        16:    'Bit 4',
        32:    'Bit 5',
        64:    'Bit 6',
        128:   'Bit 7',
        256:   'Bit 8',
        512:   'Bit 9',
        1024:  'Bit 10',
        2048:  'Bit 11',
        4096:  'Bit 12',
        8192:  'Bit 13',
        16384: 'Bit 14',
        32768: 'Bit 15'
    }



    static INTERNAL_ATTRIBUTES_MAPPING = {

        16384: '(Bit 1) Reserved for use by PKWARE',
        8192:  '(Bit 2) Reserved for use by PKWARE',
        2:     '(Bit 14) A 4 byte variable record length control field precedes each logical record (mainframe data transfer support) LOL!',
        1:     '(Bit 15) File is an ASCII or text file'
    }

    constructor(buffer) {

        this.verifySignature(buffer)
        this.readVersionNeededToExtract(buffer)
        this.readGeneralPurposeBitFlag(buffer)
        this.readCompressionMethod(buffer)
        this.readLastModFileTime(buffer)
        this.readLastModFileDate(buffer)
        this.readCRC32(buffer)
        this.readCompressedSize(buffer)
        this.readUncompressedSize(buffer)
        this.readFileNameLength(buffer)
        this.readExtraFieldLength(buffer)

        this.variableHeaderLength = this.fileNameLength + this.extraFieldLength
        this.totalHeaderLength = LFH.HEADER_FIXED_LENGTH + this.fileNameLength + this.extraFieldLength
    }

    readVariableData(buffer) {

        this.readFileName(buffer, this.fileNameLength)
        this.readExtraField(buffer, this.fileNameLength, this.extraFieldLength)
    }

    /**
     * Verify local file header (LFH) signature.
     * Offset 0, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    verifySignature(buffer) {

        if (LFH.SIGNATURE !== buffer.readUInt32LE(0))
            console.log('kekekeke1!!!')
    }

    /**
     * Read version needed to extract.
     * Offset 4, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.3
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readVersionNeededToExtract(buffer) {

        this.versionNeededToExtract = buffer.readUInt8(4)
    }

    getVersionNeededToExtractInfo() {

        return `(${this.toHex(this.versionNeededToExtract)}) - ${(this.versionNeededToExtract / 10).toFixed(1)} ${VERSION_MAPPING[this.versionNeededToExtract] ? VERSION_MAPPING[this.versionNeededToExtract] : 'not specified by APPNOTE.TXT - .ZIP File Format Specification'}`
    }

    /**
     * Read general purpose bit flag.
     * Offset 6, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.4
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readGeneralPurposeBitFlag(buffer) {

        this.generalPurposeBitFlag = buffer.readUInt16LE(6)
        this.generalPurposeBitFlagInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = this.generalPurposeBitFlag & Math.pow(2, i)

            if (LFH.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit] !== undefined)
                this.generalPurposeBitFlagInfo.push(LFH.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit])
        }
    }

    /**
     * Read compression method.
     * Offset 8, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.5
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressionMethod(buffer) {

        this.compressionMethod = buffer.readUInt16LE(8)
    }

    getCompressionMethodInfo(buffer) {

        return `(${this.toHex(this.compressionMethod)}) - ${COMPRESSION_METHOD_MAPPING[this.compressionMethod] ? COMPRESSION_METHOD_MAPPING[this.compressionMethod] : 'not specified by APPNOTE.TXT - .ZIP File Format Specification'}`
    }

    /**
     * Read last mod file time.
     * Offset 10, 2 bytes (16 bit).
     *
     * MS-DOS Time/Date specification http://www.vsft.com/hal/dostime.htm
     * .ZIP File Format Specification: sections 4.4.6
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLastModFileTime(buffer) {

        this.lastModFileTime = buffer.readUInt16LE(10)
    }

    getLastModFileTimeInfo() {

        const seconds = this.lastModFileTime & 0x1F
        const minutes = (this.lastModFileTime & 0x7E0) >>> 5
        const hours = (this.lastModFileTime & 0xF800) >>> 11

        return `(${this.toHex(this.lastModFileTime)}) - ${hours}:${minutes}:${seconds}`
    }

    /**
     * Read last mod file date.
     * Offset 12, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.6
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLastModFileDate(buffer) {

        this.lastModFileDate = buffer.readUInt16LE(12)

        const day = this.lastModFileDate & 0x1F
        const month = (this.lastModFileDate & 0x1E0) >>> 5
        const year = ((this.lastModFileDate & 0xFE00) >>> 9) + 1980

        this.lastModFileDateInfo = `${day}/${month}/${year}`
    }

    getLastModFileDateInfo() {

        const day = this.lastModFileDate & 0x1F
        const month = (this.lastModFileDate & 0x1E0) >>> 5
        const year = ((this.lastModFileDate & 0xFE00) >>> 9) + 1980

        return `(${this.toHex(this.lastModFileDate)}) - ${day}/${month}/${year}`
    }

    /**
     * Read crc-32.
     * Offset 14, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.7
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCRC32(buffer) {

        this.crc32 = buffer.readUInt32LE(14)
    }

    getCRC32Info() {

        return `(${this.toHex(this.crc32)})`
    }

    /**
     * Read compressed size.
     * Offset 18, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.8
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressedSize(buffer) {

        this.compressedSize = buffer.readUInt32LE(18)
    }

    getCompressedSizeInfo() {

        return `(${this.toHex(this.compressedSize)})`
    }

    /**
     * Read uncompressed size.
     * Offset 22, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.9
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readUncompressedSize(buffer) {

        this.uncompressedSize = buffer.readUInt32LE(22)
    }

    getUncompressedSizeInfo() {

        return `(${this.toHex(this.uncompressedSize)})`
    }

    /**
     * Read file name length.
     * Offset 26, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.10
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileNameLength(buffer) {

        this.fileNameLength = buffer.readUInt16LE(26)
    }

    getFileNameLengthInfo(buffer) {

        return `(${this.toHex(this.fileNameLength)})`
    }

    /**
     * Read extra field length.
     * Offset 28, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.11
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExtraFieldLength(buffer) {

        this.extraFieldLength = buffer.readUInt16LE(28)
    }

    getExtraFieldLengthInfo(buffer) {

        return `(${this.toHex(this.extraFieldLength)})`
    }

    /**
     * Read file name (variable size).
     *
     * .ZIP File Format Specification: sections 4.4.17
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} length The length of the file name.
     */
    readFileName(buffer, length) {

        this.fileName = buffer.toString('utf8', 0, length)
    }

    /**
     * Read extra field (variable size).
     *
     * .ZIP File Format Specification: sections 4.4.28, 4.5.1, 4.5.2
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} addedOffset The filename length additional offset.
     * @param {buffer} length The length of the extra field.
     */
    readExtraField(buffer, addedOffset, length) {

        this.extraField = buffer.slice(addedOffset, addedOffset + length).toString('hex')
    }

    /**
     * Read extra field (variable size).
     *
     * .ZIP File Format Specification: sections 4.4.28, 4.5.1, 4.5.2
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} addedOffset The filename length additional offset.
     * @param {buffer} length The length of the extra field.
     */
    readFileData() {


    }

    toHex(value) {

        return `0x${value.toString(16).toUpperCase()}`
    }

    toString() {

        let str = ''

        str += `[ LOCAL FILE HEADER ]${os.EOL}`
        str += `Signature                         : ${this.toHex(LFH.SIGNATURE)}${os.EOL}`
        str += `Version needed to extract         : ${this.versionNeededToExtract} ${this.getVersionNeededToExtractInfo()} ${os.EOL}`
        str += `General purpose bit flag          : ${this.generalPurposeBitFlag} (0x${this.generalPurposeBitFlag.toString(16).toUpperCase()})${os.EOL}`
        str += this.generalPurposeBitFlagInfo.reduce((accu, obj) => accu += `${' '.repeat(36)}${obj}${os.EOL}`, '')
        str += `Compression method                : ${this.compressionMethod} ${this.getCompressionMethodInfo()}${os.EOL}`
        str += `Last mod file time                : ${this.lastModFileTime} ${this.getLastModFileTimeInfo()}${os.EOL}`
        str += `Last mod file date                : ${this.lastModFileDate} ${this.getLastModFileDateInfo()}${os.EOL}`
        str += `CRC-32                            : ${this.crc32} ${this.getCRC32Info()}${os.EOL}`
        str += `Compressed size                   : ${this.compressedSize} ${this.getCompressedSizeInfo()}${os.EOL}`
        str += `Uncompressed size                 : ${this.uncompressedSize} ${this.getUncompressedSizeInfo()}${os.EOL}`
        str += `File name length                  : ${this.fileNameLength} ${this.getFileNameLengthInfo()}${os.EOL}`
        str += `Extra field length                : ${this.extraFieldLength} ${this.getExtraFieldLengthInfo()}${os.EOL}`
        str += `File name                         : ${this.fileName}${os.EOL}`
        str += `Extra field                       : ${this.extraField}${os.EOL}`

        str += `[ LOCAL FILE HEADER LENGTH ${this.totalHeaderLength} (${this.toHex(this.totalHeaderLength)}) ]`

        return str
    }
}

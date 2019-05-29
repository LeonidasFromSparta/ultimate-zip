import os from 'os'
import {VERSION_MAPPING, COMPRESSION_METHOD_MAPPING, PLATFORM_MAPPING} from './mappings'

export default class CentralFileHeader {

    static HEADER_FIXED_LENGTH = 46
    static SIGNATURE = 0x02014b50

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

        this.buffer = buffer

        this.checkSignature()
        this.totalHeaderLength = CentralFileHeader.HEADER_FIXED_LENGTH + this.readFilenameLength().value + this.readExtraFieldLength().value + this.readFileCommentLength().value

        const newBuffer = Buffer.allocUnsafe(this.totalHeaderLength)
        this.buffer.copy(newBuffer, 0, 0, this.totalHeaderLength)

        this.buffer = newBuffer
    }

    /**
     * Verify central directory header (CDH) signature.
     * Offset 0, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    checkSignature() {

        if (CentralFileHeader.SIGNATURE !== this.buffer.readUInt32LE(0))
            console.log('kekekeke1!!!')
    }

    /**
     * Read version made by.
     * Offset 4, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.2
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readVersionMadeBy() {

        const value = this.buffer.readUInt16LE(4)

        const info = () => {

            const versionValue = this.buffer.readUInt16LE(4)
            const version = (this.buffer.readUInt16LE(4) / 10).toFixed(1)

            const platformValue = this.buffer.readUInt8(5)
            const platform = PLATFORM_MAPPING[platformValue] ? PLATFORM_MAPPING[platformValue] : 'Unknown compatible platform'

            return '(' + this.toHex(value) + ')' + ' - (HI) Platform ' + platform + ' (LO) Version ' + version
        }

        return {value, info}
    }

    /**
     * Read version needed to extract.
     * Offset 6, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.3
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readVersionNeededToExtract() {

        const value = this.buffer.readUInt16LE(6)

        const info = () => {

            const version = (value / 10).toFixed(1)
            const versionInfo = VERSION_MAPPING[value] ? VERSION_MAPPING[value] : 'Unknown version'

            return '(' + this.toHex(value) + ')' + ' - Version ' + version + ' ' + versionInfo
        }

        return {value, info}
    }

    /**
     * Read general purpose bit flag.
     * Offset 8, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.4
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readGeneralPurposeBitFlag(buffer) {

        this.generalPurposeBitFlag = buffer.readUInt16LE(8)
        this.generalPurposeBitFlagInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = this.generalPurposeBitFlag & Math.pow(2, i)

            if (CentralFileHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit] !== undefined)
                this.generalPurposeBitFlagInfo.push(CentralFileHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit])
        }
    }

    /**
     * Read compression method.
     * Offset 10, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.5
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressionMethod() {

        const value = this.buffer.readUInt16LE(10)

        const info = () => {

            const info = COMPRESSION_METHOD_MAPPING[value] ? COMPRESSION_METHOD_MAPPING[value] : 'Unknown compression method'

            return '(' + this.toHex(value) + ')' + ' - ' + info
        }

        return {value, info}
    }

    /**
     * Read last mod file time.
     * Offset 12, 2 bytes (16 bit).
     *
     * MS-DOS Time/Date specification http://www.vsft.com/hal/dostime.htm
     * .ZIP File Format Specification: sections 4.4.6
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLastModFileTime() {

        const value = this.buffer.readUInt16LE(12)

        const info = () => {

            const seconds = value & 0x1F
            const minutes = (value & 0x7E0) >>> 5
            const hours = (value & 0xF800) >>> 11

            return '(' + this.toHex(value) + ')' + ' - ' + hours + ':' + minutes + ':' + seconds
        }

        return {value, info}
    }

    /**
     * Read last mod file date.
     * Offset 14, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.6
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLastModFileDate(buffer) {

        const value = this.buffer.readUInt16LE(14)

        const info = () => {

            const day = value & 0x1F
            const month = (value & 0x1E0) >>> 5
            const year = ((value & 0xFE00) >>> 9) + 1980

            return '(' + this.toHex(value) + ')' + ' - ' + day + '/' + month + '/' + year
        }

        return {value, info}
    }

    /**
     * Read crc-32.
     * Offset 16, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.7
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCRC32() {

        const value = this.buffer.readUInt32LE(16)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read compressed size.
     * Offset 20, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.8
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressedSize() {

        const value = this.buffer.readUInt32LE(20)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read uncompressed size.
     * Offset 24, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.9
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readUncompressedSize() {

        const value = this.buffer.readUInt32LE(24)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read file name length.
     * Offset 28, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.10
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFilenameLength() {

        const value =  this.buffer.readUInt16LE(28)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read extra field length.
     * Offset 30, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.11
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExtraFieldLength() {

        const value = this.buffer.readUInt16LE(30)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read file comment length.
     * Offset 32, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.12
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileCommentLength() {

        const value = this.buffer.readUInt16LE(32)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read disk number start.
     * Offset 34, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.13
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readDiskNumberStart() {

        const value = this.buffer.readUInt16LE(34)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read internal file attributes.
     * Offset 36, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.14
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readInternalFileAttributes(buffer) {

        this.internalFileAttributes = buffer.readUInt16LE(36)

        this.internalFileAttributesInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = this.internalFileAttributes & Math.pow(2, i)

            if (CentralFileHeader.INTERNAL_ATTRIBUTES_MAPPING[bit] !== undefined)
                this.internalFileAttributesInfo.push(CentralFileHeader.INTERNAL_ATTRIBUTES_MAPPING[bit])
        }
    }

    /**
     * Read external file attributes.
     * Offset 38, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.15
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExternalFileAttributes(buffer) {

        const value = this.buffer.readUInt32LE(38)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read relative offset of local header.
     * Offset 42, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.16
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readRelativeOffsetOfLocalHeader(buffer) {

        const value = this.buffer.readUInt32LE(42)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read file name (variable size).
     *
     * .ZIP File Format Specification: sections 4.4.17
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} length The length of the file name.
     */
    readFileName() {

        return this.buffer.toString('utf8', 46, 46 + this.readFilenameLength().value)
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
    readExtraField() {

        return this.buffer.toString('hex', 46 + this.readFilenameLength().value, 46 + this.readFilenameLength().value + this.readExtraFieldLength().value)
    }

    /**
     * Read file comment (variable size).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} addedOffset The file name and extra field lengths additonal offset.
     * @param {buffer} length The length of the file comment.
     */
    readFileComment() {

        return this.buffer.toString('utf8', 46 + this.readFilenameLength().value + this.readExtraFieldLength().value, 46 + this.readFilenameLength().value + this.readExtraFieldLength().value + this.readFileCommentLength().value)
    }

    toHex(value) {

        return `0x${value.toString(16).toUpperCase()}`
    }

    toString() {

        let str = ''

        str += `[ CENTRAL DIRECTORY ]${os.EOL}`

        str += 'Signature                         : ' + this.toHex(CentralFileHeader.SIGNATURE)                                                            + os.EOL
        str += 'Version made by                   : ' + this.readVersionMadeBy().value               + ' ' + this.readVersionMadeBy().info()               + os.EOL
        str += 'Version needed to extract         : ' + this.readVersionNeededToExtract().value      + ' ' + this.readVersionNeededToExtract().info()      + os.EOL
        // str += `General purpose bit flag
        str += 'Compression method                : ' + this.readCompressionMethod().value           + ' ' + this.readCompressionMethod().info()           + os.EOL
        str += 'Last mod file time                : ' + this.readLastModFileTime().value             + ' ' + this.readLastModFileTime().info()             + os.EOL
        str += 'Last mod file date                : ' + this.readLastModFileDate().value             + ' ' + this.readLastModFileDate().info()             + os.EOL
        str += 'CRC-32                            : ' + this.readCRC32().value                       + ' ' + this.readCRC32().info()                       + os.EOL
        str += 'Compressed size                   : ' + this.readCompressedSize().value              + ' ' + this.readCompressedSize().info()              + os.EOL
        str += 'Uncompressed size                 : ' + this.readUncompressedSize().value            + ' ' + this.readUncompressedSize().info()            + os.EOL
        str += 'File name legth                   : ' + this.readFilenameLength().value              + ' ' + this.readFilenameLength().info()              + os.EOL
        str += 'Extra field length                : ' + this.readExtraFieldLength().value            + ' ' + this.readExtraFieldLength().info()            + os.EOL
        str += 'File comment length               : ' + this.readFileCommentLength().value           + ' ' + this.readFileCommentLength().info()           + os.EOL
        str += 'Disk number start                 : ' + this.readDiskNumberStart().value             + ' ' + this.readDiskNumberStart().info()             + os.EOL
        // str += `Internal file attributes
        str += 'External file attributes          : ' + this.readExternalFileAttributes().value      + ' ' + this.readExternalFileAttributes().info()      + os.EOL
        str += 'Relative offset of local header   : ' + this.readRelativeOffsetOfLocalHeader().value + ' ' + this.readRelativeOffsetOfLocalHeader().info() + os.EOL
        str += 'File name                         : ' + this.readFileName()                                                                                + os.EOL
        str += 'Extra field                       : ' + this.readExtraField()                                                                              + os.EOL
        str += 'File comment                      : ' + this.readFileComment()                                                                             + os.EOL

        str += `[ CENTRAL DIRECTORY LENGTH ${this.totalHeaderLength} (0x${this.totalHeaderLength.toString(16).toUpperCase()}) ]`

        return str
    }
}

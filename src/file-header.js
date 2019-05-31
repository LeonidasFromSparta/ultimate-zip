import os from 'os'
import {VERSION_MAPPING, COMPRESSION_METHOD_MAPPING} from './mappings'

export default class FileHeader {

    static HEADER_FIXED_LENGTH = 30
    static HEADER_MAX_LENGTH = 30 + 65535 + 65535
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

        if (arguments.length === 0) {

            this.buffer = Buffer.allocUnsafe(FileHeader.HEADER_MAX_LENGTH)
            this.bufferOffset = 0

            return
        }

        this.buffer = buffer

        this.checkSignature()
        const totalHeaderLength = this.readTotalHeaderLength().value

        const newBuffer = Buffer.allocUnsafe(totalHeaderLength)
        buffer.copy(newBuffer, 0, 0, totalHeaderLength)

        this.buffer = newBuffer
    }

    feedByte(byte) {

        this.buffer.writeUInt8(byte, this.bufferOffset)
        this.bufferOffset++
    }

    isHeaderComplete() {

        if (this.bufferOffset >= FileHeader.HEADER_FIXED_LENGTH) {

            const totalHeaderLength = this.readTotalHeaderLength().value

            if (this.bufferOffset >= totalHeaderLength)
                return true
        }

        return false
    }

    /**
     * Verify local file header (LFH) signature.
     * Offset 0, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    checkSignature() {

        if (FileHeader.SIGNATURE !== this.buffer.readUInt32LE(0))
            console.log('kekekeke1!!!  ')
    }

    /**
     * Read version needed to extract.
     * Offset 4, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.3
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readVersionNeededToExtract() {

        const value = this.buffer.readUInt16LE(4)

        const info = () => {

            const version = (value / 10).toFixed(1)
            const versionInfo = VERSION_MAPPING[value] ? VERSION_MAPPING[value] : 'Unknown version'

            return '(' + this.toHex(value) + ')' + ' - Version ' + version + ' ' + versionInfo
        }

        return {value, info}
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

            if (FileHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit] !== undefined)
                this.generalPurposeBitFlagInfo.push(FileHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit])
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
    readCompressionMethod() {

        const value = this.buffer.readUInt16LE(8)

        const info = () => {

            const info = COMPRESSION_METHOD_MAPPING[value] ? COMPRESSION_METHOD_MAPPING[value] : 'Unknown compression method'

            return '(' + this.toHex(value) + ')' + ' - ' + info
        }

        return {value, info}
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
    readLastModFileTime() {

        const value = this.buffer.readUInt16LE(10)

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
     * Offset 12, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.6
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readLastModFileDate(buffer) {

        const value = this.buffer.readUInt16LE(12)

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
     * Offset 14, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.7
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCRC32() {

        const value = this.buffer.readUInt32LE(14)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read compressed size.
     * Offset 18, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.8
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressedSize() {

        const value = this.buffer.readUInt32LE(18)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read uncompressed size.
     * Offset 22, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.9
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readUncompressedSize() {

        const value = this.buffer.readUInt32LE(22)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read file name length.
     * Offset 26, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.10
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileNameLength() {

        const value =  this.buffer.readUInt16LE(26)

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    /**
     * Read extra field length.
     * Offset 28, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.11
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExtraFieldLength() {

        const value = this.buffer.readUInt16LE(28)

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

        return this.buffer.toString('utf8', 30, 30 + this.readFileNameLength().value)
    }

    /**
     * Read extra field (variable size).
     * ofset 30
     * .ZIP File Format Specification: sections 4.4.28, 4.5.1, 4.5.2
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} addedOffset The filename length additional offset.
     * @param {buffer} length The length of the extra field.
     */
    readExtraField() {

        return this.buffer.toString('hex', 30 + this.readFileNameLength().value, 30 + this.readFileNameLength().value + this.readExtraFieldLength().value)
    }

    readTotalHeaderLength() {

        const value = FileHeader.HEADER_FIXED_LENGTH + this.readFileNameLength().value + this.readExtraFieldLength().value

        const info = () => {

            return '(' + this.toHex(value) + ')'
        }

        return {value, info}
    }

    toHex(value) {

        return `0x${value.toString(16).toUpperCase()}`
    }

    toString() {

        let str = ''

        str += '[ LOCAL FILE HEADER ]' + os.EOL
        str += 'Signature                         : ' + this.toHex(FileHeader.SIGNATURE)                                                              + os.EOL
        str += 'Version needed to extract         : ' + this.readVersionNeededToExtract().value      + ' ' + this.readVersionNeededToExtract().info()      + os.EOL
        // str += `General purpose bit flag          : ${this.generalPurposeBitFlag} (0x${this.generalPurposeBitFlag.toString(16).toUpperCase()})${os.EOL}`
        // str += this.generalPurposeBitFlagInfo.reduce((accu, obj) => accu += `${' '.repeat(36)}${obj}${os.EOL}`, '')
        str += 'Compression method                : ' + this.readCompressionMethod().value           + ' ' + this.readCompressionMethod().info()           + os.EOL
        str += 'Last mod file time                : ' + this.readLastModFileTime().value             + ' ' + this.readLastModFileTime().info()             + os.EOL
        str += 'Last mod file date                : ' + this.readLastModFileDate().value             + ' ' + this.readLastModFileDate().info()             + os.EOL
        str += 'CRC-32                            : ' + this.readCRC32().value                       + ' ' + this.readCRC32().info()                       + os.EOL
        str += 'Compressed size                   : ' + this.readCompressedSize().value              + ' ' + this.readCompressedSize().info()              + os.EOL
        str += 'Uncompressed size                 : ' + this.readUncompressedSize().value            + ' ' + this.readUncompressedSize().info()            + os.EOL
        str += 'File name legth                   : ' + this.readFileNameLength().value              + ' ' + this.readFileNameLength().info()              + os.EOL
        str += 'Extra field length                : ' + this.readExtraFieldLength().value            + ' ' + this.readExtraFieldLength().info()            + os.EOL
        str += 'File name                         : ' + this.readFileName()                                                                                + os.EOL
        str += 'Extra field                       : ' + this.readExtraField()                                                                              + os.EOL

        str += '[ LOCAL FILE HEADER LENGTH ' + this.readTotalHeaderLength().value + ' ' + this.readTotalHeaderLength().info() + ' ]'                       + os.EOL

        return str
    }
}

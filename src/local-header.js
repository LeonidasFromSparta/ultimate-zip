import {EOL} from 'os'
import {VERSION, COMPRESSION_METHOD} from './contants'

export default class LocalHeader {

    static HEADER_FIXED_LENGTH = 30
    static HEADER_MAX_LENGTH = LocalHeader.HEADER_FIXED_LENGTH + 65535 + 65535
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

    #buffer

    constructor(buffer) {

        this.#buffer = buffer
    }

    /**
     * Method checks header signature.
     */
    checkSignature = () => {

        if (LocalHeader.SIGNATURE !== this.getSignature())
            throw `Loca File' header signature could not be verified: expected ${LocalHeader.SIGNATURE}, actual ${this.getSignature()}`
    }

    /**
     * Method reads header signature.
     * Offset 0, 4 bytes (32 bit).
     */
    getSignature = () => this.#buffer.readUInt32LE(0)

    #getSignatureInfo = () => {

        const value = this.getSignature()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads version needed to extract.
     * Offset 4, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.3
     */
    getVersionNeededToExtract = () => this.#buffer.readUInt16LE(4)

    #getVersionNeededToExtractInfo = () => {

        const value = this.getVersionNeededToExtract()

        const version = (value / 10).toFixed(1)
        const versionInfo = VERSION[value] ? VERSION[value] : 'Unknown ZIP spec version'

        return '(' + this.#toHex(value) + ')' + ' - Version ' + version + ' ' + versionInfo
    }

    /**
     * Method reads general purpose bit flag.
     * Offset 6, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.4
     */
    getGeneralPurposeBitFlag = () => this.#buffer.readUInt16LE(6)

    #getGeneralPurposeBitFlagInfo = () => {

        const value = this.readGeneralPurposeBitFlag()
        const generalPurposeBitFlagInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = value & Math.pow(2, i)

            if (LocalHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit] !== undefined)
                generalPurposeBitFlagInfo.push(LocalHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit])
        }
    }

    /**
     * Method reads compression method.
     * Offset 8, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.5
     */
    getCompressionMethod = () => this.#buffer.readUInt16LE(8)

    #getCompressionMethodInfo = () => {

        const value = this.getCompressionMethod()

        const info = COMPRESSION_METHOD[value] ? COMPRESSION_METHOD[value] : 'Unknown compression method'
        return '(' + this.#toHex(value) + ')' + ' - ' + info
    }

    /**
     * Method reads last mod file time.
     * Offset 10, 2 bytes (16 bit).
     *
     * MS-DOS Time/Date specification http://www.vsft.com/hal/dostime.htm
     * .ZIP File Format Specification: sections 4.4.6
     */
    getLastModFileTime = () => this.#buffer.readUInt16LE(10)

    #getLastModFileTimeInfo = () => {

        const value = this.getLastModFileTime()

        const seconds = value & 0x1F
        const minutes = (value & 0x7E0) >>> 5
        const hours = (value & 0xF800) >>> 11

        return '(' + this.#toHex(value) + ')' + ' - ' + hours + ':' + minutes + ':' + seconds
    }

    /**
     * Method reads last mod file date.
     * Offset 12, 2 bytes (16 bit).
     *
     * MS-DOS Time/Date specification http://www.vsft.com/hal/dostime.htm
     * .ZIP File Format Specification: sections 4.4.6
     */
    getLastModFileDate = () => this.#buffer.readUInt16LE(12)

    #getLastModFileDateInfo = () => {

        const value = this.getLastModFileDate()

        const day = value & 0x1F
        const month = (value & 0x1E0) >>> 5
        const year = ((value & 0xFE00) >>> 9) + 1980

        return '(' + this.#toHex(value) + ')' + ' - ' + day + '/' + month + '/' + year
    }

    /**
     * Method reads crc-32.
     * Offset 14, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.7
     */
    getCRC32 = () => this.#buffer.readUInt32LE(14)

    #getCRC32Info = () => {

        const value = this.getCRC32()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads compressed size.
     * Offset 18, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.8
     */
    getCompressedSize = () => this.#buffer.readUInt32LE(18)

    #getCompressedSizeInfo = () => {

        const value = this.getCompressedSize()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads uncompressed size.
     * Offset 22, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.9
     */
    getUncompressedSize = () => this.#buffer.readUInt32LE(22)

    #getUncompressedSizeInfo = () => {

        const value = this.getUncompressedSize()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads file name length.
     * Offset 26, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.10
     */
    getFileNameLength = () => this.#buffer.readUInt16LE(26)

    #getFileNameLengthInfo = () => {

        const value =  this.getFileNameLength()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads extra field length.
     * Offset 28, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.11
     */
    getExtraFieldLength = () => this.#buffer.readUInt16LE(28)

    #getExtraFieldLengthInfo = () => {

        const value = this.getExtraFieldLength()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads file name.
     * Offset 30, variable size (max 64kb).
     *
     * .ZIP File Format Specification: sections 4.4.17
     */
    getFileName = () => this.#buffer.toString('utf8', 30, 30 + this.getFileNameLength())

    /**
     * Method reads extra field.
     * offset 30 + filename length, variable size (max 64kb)
     *
     * .ZIP File Format Specification: sections 4.4.28, 4.5.1, 4.5.2
     */
    getExtraField = () => this.#buffer.toString('hex', 30 + this.getFileNameLength(), 30 + this.getFileNameLength() + this.getExtraFieldLength())

    getHeaderLength = () => LocalHeader.HEADER_FIXED_LENGTH + this.getFileNameLength() + this.getExtraFieldLength()

    #getHeaderLengthInfo = () => '(' + this.#toHex(this.getHeaderLength()) + ')'

    #toHex = (value) => `0x${value.toString(16).toUpperCase()}`

    toString = () => {

        let str = ''

        str += '[ LOCAL FILE HEADER ]' + EOL

        str += 'Signature                         : ' + this.#getSignatureInfo()                                                       + EOL
        str += 'Version needed to extract         : ' + this.getVersionNeededToExtract() + ' ' + this.#getVersionNeededToExtractInfo() + EOL
        str += 'General purpose bit flag          : ' + this.getGeneralPurposeBitFlag()  + ' ' +                                         EOL
        str += 'Compression method                : ' + this.getCompressionMethod()      + ' ' + this.#getCompressionMethodInfo()      + EOL
        str += 'Last mod file time                : ' + this.getLastModFileTime()        + ' ' + this.#getLastModFileTimeInfo()        + EOL
        str += 'Last mod file date                : ' + this.getLastModFileDate()        + ' ' + this.#getLastModFileDateInfo()        + EOL
        str += 'CRC-32                            : ' + this.getCRC32()                  + ' ' + this.#getCRC32Info()                  + EOL
        str += 'Compressed size                   : ' + this.getCompressedSize()         + ' ' + this.#getCompressedSizeInfo()         + EOL
        str += 'Uncompressed size                 : ' + this.getUncompressedSize()       + ' ' + this.#getUncompressedSizeInfo()       + EOL
        str += 'File name legth                   : ' + this.getFileNameLength()         + ' ' + this.#getFileNameLengthInfo()         + EOL
        str += 'Extra field length                : ' + this.getExtraFieldLength()       + ' ' + this.#getExtraFieldLengthInfo()       + EOL
        str += 'File name                         : ' + this.getFileName()                                                             + EOL
        str += 'Extra field                       : ' + this.getExtraField()                                                           + EOL

        str += '[ LOCAL FILE HEADER | LENGTH ' + this.getHeaderLength() + ' ' + this.#getHeaderLengthInfo() + ' ]' + EOL

        return str
    }
}

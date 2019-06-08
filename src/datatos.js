import {EOL} from 'os'
import {VERSION_MAPPING, COMPRESSION_METHOD_MAPPING, PLATFORM_MAPPING} from './mappings'

export default class CentralHeader {

    static HEADER_FIXED_LENGTH = 46
    static HEADER_MAX_LENGTH = CentralHeader.HEADER_FIXED_LENGTH + 65536 + 65536 + 65536
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

    #buffer

    constructor(buffer) {

        this.#buffer = buffer
    }

    /**
     * Method checks header signature.
     */
    checkSignature = () => {

        if (CentralHeader.SIGNATURE !== this.getSignature())
            throw `Central file header signature could not be verified: expected ${CentralHeader.SIGNATURE}, actual ${this.getSignature()}`
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
     * Method reads version made by.
     * Offset 4, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.2
     */
    getVersionMadeBy = () => this.#buffer.readUInt16LE(4)

    // TO-DO think how to get rid of reading buffer in this func
    #getVersionMadeByInfo = () => {

        const versionValue = this.#buffer.readUInt16LE(4)
        const version = (this.#buffer.readUInt16LE(4) / 10).toFixed(1)

        const platformValue = this.#buffer.readUInt8(5)
        const platform = PLATFORM_MAPPING[platformValue] ? PLATFORM_MAPPING[platformValue] : 'Unknown compatible platform'

        return '(' + this.#toHex(versionValue) + ')' + ' - (HI) Platform ' + platform + ' (LO) Version ' + version
    }

    /**
     * Method reads version needed to extract.
     * Offset 6, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.3
     */
    getVersionNeededToExtract = () => this.#buffer.readUInt16LE(6)

    #getVersionNeededToExtractInfo = () => {

        const value = this.getVersionNeededToExtract()

        const version = (value / 10).toFixed(1)
        const versionInfo = VERSION_MAPPING[value] ? VERSION_MAPPING[value] : 'Unknown version'

        return '(' + this.#toHex(value) + ')' + ' - Version ' + version + ' ' + versionInfo
    }

    /**
     * Method reads general purpose bit flag.
     * Offset 8, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.4
     */
    getGeneralPurposeBitFlag = () => this.#buffer.readUInt16LE(8)

    #getGeneralPurposeBitFlagInfo = () => {

        this.value = this.getGeneralPurposeBitFlag()
        this.generalPurposeBitFlagInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = this.value & Math.pow(2, i)

            if (CentralHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit] !== undefined)
                this.generalPurposeBitFlagInfo.push(CentralHeader.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit])
        }
    }

    /**
     * Method reads compression method.
     * Offset 10, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.5
     */
    getCompressionMethod = () => this.#buffer.readUInt16LE(10)

    #getCompressionMethodInfo = () => {

        const value = this.getCompressionMethod()

        const info = COMPRESSION_METHOD_MAPPING[value] ? COMPRESSION_METHOD_MAPPING[value] : 'Unknown compression method'
        return '(' + this.#toHex(value) + ')' + ' - ' + info
    }

    /**
     * Method reads last mod file time.
     * Offset 12, 2 bytes (16 bit).
     *
     * MS-DOS Time/Date specification http://www.vsft.com/hal/dostime.htm
     * .ZIP File Format Specification: sections 4.4.6
     */
    getLastModFileTime = () => this.#buffer.readUInt16LE(12)

    #getLastModFileTimeInfo = () => {

        const value = this.getLastModFileTime()

        const seconds = value & 0x1F
        const minutes = (value & 0x7E0) >>> 5
        const hours = (value & 0xF800) >>> 11

        return '(' + this.#toHex(value) + ')' + ' - ' + hours + ':' + minutes + ':' + seconds
    }

    /**
     * Method reads last mod file date.
     * Offset 14, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.6
     */
    getLastModFileDate = () => this.#buffer.readUInt16LE(14)

    #getLastModFileDateInfo = () => {

        const value = this.getLastModFileDate()

        const day = value & 0x1F
        const month = (value & 0x1E0) >>> 5
        const year = ((value & 0xFE00) >>> 9) + 1980

        return '(' + this.#toHex(value) + ')' + ' - ' + day + '/' + month + '/' + year
    }

    /**
     * Method reads crc-32.
     * Offset 16, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.7
     */
    getCRC32 = () => this.#buffer.readUInt32LE(16)

    #getCRC32Info = () => {

        const value = this.getCRC32()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads compressed size.
     * Offset 20, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.8
     */
    getCompressedSize = () => this.#buffer.readUInt32LE(20)

    #getCompressedSizeInfo = () => {

        const value = this.getCompressedSize()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads uncompressed size.
     * Offset 24, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.9
     */
    getUncompressedSize = () => this.#buffer.readUInt32LE(24)

    #getUncompressedSizeInfo = () => {

        const value = this.getUncompressedSize()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads file name length.
     * Offset 28, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.10
     */
    getFileNameLength = () => this.#buffer.readUInt16LE(28)

    #getFileNameLengthInfo = () => {

        const value =  this.getFileNameLength()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads extra field length.
     * Offset 30, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.11
     */
    getExtraFieldLength = () => this.#buffer.readUInt16LE(30)

    #getExtraFieldLengthInfo = () => {

        const value = this.getExtraFieldLength()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads file comment length.
     * Offset 32, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.12
     */
    getFileCommentLength = () => this.#buffer.readUInt16LE(32)

    #getFileCommentLengthInfo = () => {

        const value = this.getFileCommentLength()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads disk number start.
     * Offset 34, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.13
     */
    getDiskNumberStart = () => this.#buffer.readUInt16LE(34)

    #getDiskNumberStartInfo = () => {

        const value = this.getDiskNumberStart()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads internal file attributes.
     * Offset 36, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.14
     */
    getInternalFileAttributes = () => this.#buffer.readUInt16LE(36)

    #getInternalFileAttributesInfo = () => {

        const value = this.getInternalFileAttributes()

        const internalFileAttributesInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = value & Math.pow(2, i)

            if (CentralHeader.INTERNAL_ATTRIBUTES_MAPPING[bit] !== undefined)
                internalFileAttributesInfo.push(CentralHeader.INTERNAL_ATTRIBUTES_MAPPING[bit])
        }
    }

    /**
     * Method reads external file attributes.
     * Offset 38, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.15
     */
    getExternalFileAttributes = () => this.#buffer.readUInt32LE(38)

    #getExternalFileAttributesInfo = () => {

        const value = this.getExternalFileAttributes()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads relative offset of local header.
     * Offset 42, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.16
     */
    getOffsetOfLocalFileHeader = () => this.#buffer.readUInt32LE(42)

    #getOffsetOfLocalFileHeaderInfo = () => {

        const value = this.getOffsetOfLocalFileHeader()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads file name.
     * Offset 46, variable size (max 64kb).
     *
     * .ZIP File Format Specification: sections 4.4.17
     */
    getFileName = () => this.#buffer.toString('utf8', 46, 46 + this.getFileNameLength())

    /**
     * Method reads extra field.
     * Offset 46 + filename length, variable size (max 64kb)
     *
     * .ZIP File Format Specification: sections 4.4.28, 4.5.1, 4.5.2
     */
    getExtraField = () => this.#buffer.toString('hex', 46 + this.getFileNameLength(), 46 + this.getFileNameLength() + this.getExtraFieldLength())

    /**
     * Method reads file comment.
     * Offset 46 + filename length + extra field length, variable size (max 64kb)
     *
     * .ZIP File Format Specification: sections 4.4.18
     */
    getFileComment = () => this.#buffer.toString('utf8', 46 + this.getFileNameLength() + this.getExtraFieldLength(), 46 + this.getFileNameLength() + this.getExtraFieldLength() + this.getFileCommentLength())

    getHeaderLength = () => CentralHeader.HEADER_FIXED_LENGTH + this.getFileNameLength() + this.getExtraFieldLength() + this.getFileCommentLength()

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()

    #getHeaderLengthInfo = () => '(' + this.#toHex(this.getHeaderLength()) + ')'

    #toHex = (value) => `0x${value.toString(16).toUpperCase()}`

    toString = () => {

        let str = ''

        str += '[ CENTRAL FILE HEADER ]' + EOL

        str += 'Signature                         : ' + this.#getSignatureInfo()                                                                           + EOL
        str += 'Version made by                   : ' + this.getVersionMadeBy()                      + ' ' + this.#getVersionMadeByInfo()                  + EOL
        str += 'Version needed to extract         : ' + this.getVersionNeededToExtract()             + ' ' + this.#getVersionNeededToExtractInfo()         + EOL
        str += 'General purpose bit flag          : ' + this.getGeneralPurposeBitFlag()              + ' ' +                                                 EOL
        str += 'Compression method                : ' + this.getCompressionMethod()                  + ' ' + this.#getCompressionMethodInfo()              + EOL
        str += 'Last mod file time                : ' + this.getLastModFileTime()                    + ' ' + this.#getLastModFileTimeInfo()                + EOL
        str += 'Last mod file date                : ' + this.getLastModFileDate()                    + ' ' + this.#getLastModFileDateInfo()                + EOL
        str += 'CRC-32                            : ' + this.getCRC32()                              + ' ' + this.#getCRC32Info()                          + EOL
        str += 'Compressed size                   : ' + this.getCompressedSize()                     + ' ' + this.#getCompressedSizeInfo()                 + EOL
        str += 'Uncompressed size                 : ' + this.getUncompressedSize()                   + ' ' + this.#getUncompressedSizeInfo()               + EOL
        str += 'File name length                  : ' + this.getFileNameLength()                     + ' ' + this.#getFileNameLengthInfo()                 + EOL
        str += 'Extra field length                : ' + this.getExtraFieldLength()                   + ' ' + this.#getExtraFieldLengthInfo()               + EOL
        str += 'File comment length               : ' + this.getFileCommentLength()                  + ' ' + this.#getFileCommentLengthInfo()              + EOL
        str += 'Disk number start                 : ' + this.getDiskNumberStart()                    + ' ' + this.#getDiskNumberStartInfo()                + EOL
        str += 'Internal file attributes          : ' + this.getInternalFileAttributes()             + ' ' +                                                 EOL
        str += 'External file attributes          : ' + this.getExternalFileAttributes()             + ' ' + this.#getExternalFileAttributesInfo()         + EOL
        str += 'Relative offset of local header   : ' + this.getOffsetOfLocalFileHeader()            + ' ' + this.#getOffsetOfLocalFileHeaderInfo()        + EOL
        str += 'File name                         : ' + this.getFileName()                                                                                 + EOL
        str += 'Extra field                       : ' + this.getExtraField()                                                                               + EOL
        str += 'File comment                      : ' + this.getFileComment()                                                                              + EOL

        str += '[ CENTRAL FILE HEADER | LENGTH ' + this.getHeaderLength() + ' ' + this.#getHeaderLengthInfo() + ' ]' + EOL

        return str
    }

    extractTo = async () => {

        this.File.write()
    }
}

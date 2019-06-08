import {EOL} from 'os'
import CentralHeaderSerializer from './central-header-serializer'
import {VERSION_MAPPING, COMPRESSION_METHOD_MAPPING, PLATFORM_MAPPING} from './mappings'

export default class CentralHeaderInfo {

    static HEADER_FIXED_LENGTH = 46
    static HEADER_MAX_LENGTH = CentralHeaderInfo.HEADER_FIXED_LENGTH + 65536 + 65536 + 65536
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

    constructor(header) {

        this.header = header
    }

    getSignatureInfo = () => {

        return '(' + this.#toHex(CentralHeaderSerializer.SIGNATURE) + ')'
    }

    getVersionMadeByInfo = () => {

        const value = (this.header.getVersionMadeBy() / 10).toFixed(1)
        return value + ' (' + this.#toHex(value) + ')'
    }

    /*
    getVersionMadeByInfo1 = () => {

        const versionValue = this.#buffer.readUInt16LE(4)
        const version = (this.#buffer.readUInt16LE(4) / 10).toFixed(1)

        const platformValue = this.#buffer.readUInt8(5)
        const platform = PLATFORM_MAPPING[platformValue] ? PLATFORM_MAPPING[platformValue] : 'Unknown compatible platform'

        return '(' + this.#toHex(versionValue) + ')' + ' - (HI) Platform ' + platform + ' (LO) Version ' + version
    }

    getVersionNeededToExtract = () => this.#buffer.readUInt16LE(6)

    #getVersionNeededToExtractInfo = () => {

        const value = this.getVersionNeededToExtract()

        const version = (value / 10).toFixed(1)
        const versionInfo = VERSION_MAPPING[value] ? VERSION_MAPPING[value] : 'Unknown version'

        return '(' + this.#toHex(value) + ')' + ' - Version ' + version + ' ' + versionInfo
    }

    getGeneralPurposeBitFlag = () => this.#buffer.readUInt16LE(8)

    #getGeneralPurposeBitFlagInfo = () => {

        this.value = this.getGeneralPurposeBitFlag()
        this.generalPurposeBitFlagInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = this.value & Math.pow(2, i)

            if (CentralHeaderInfo.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit] !== undefined)
                this.generalPurposeBitFlagInfo.push(CentralHeaderInfo.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit])
        }
    }


    getCompressionMethod = () => this.#buffer.readUInt16LE(10)

    #getCompressionMethodInfo = () => {

        const value = this.getCompressionMethod()

        const info = COMPRESSION_METHOD_MAPPING[value] ? COMPRESSION_METHOD_MAPPING[value] : 'Unknown compression method'
        return '(' + this.#toHex(value) + ')' + ' - ' + info
    }

    getLastModFileTime = () => this.#buffer.readUInt16LE(12)

    #getLastModFileTimeInfo = () => {

        const value = this.getLastModFileTime()

        const seconds = value & 0x1F
        const minutes = (value & 0x7E0) >>> 5
        const hours = (value & 0xF800) >>> 11

        return '(' + this.#toHex(value) + ')' + ' - ' + hours + ':' + minutes + ':' + seconds
    }

    getLastModFileDate = () => this.#buffer.readUInt16LE(14)

    #getLastModFileDateInfo = () => {

        const value = this.getLastModFileDate()

        const day = value & 0x1F
        const month = (value & 0x1E0) >>> 5
        const year = ((value & 0xFE00) >>> 9) + 1980

        return '(' + this.#toHex(value) + ')' + ' - ' + day + '/' + month + '/' + year
    }


    getCRC32 = () => this.#buffer.readUInt32LE(16)

    #getCRC32Info = () => {

        const value = this.getCRC32()
        return '(' + this.#toHex(value) + ')'
    }


    getCompressedSize = () => this.#buffer.readUInt32LE(20)

    #getCompressedSizeInfo = () => {

        const value = this.getCompressedSize()
        return '(' + this.#toHex(value) + ')'
    }

    getUncompressedSize = () => this.#buffer.readUInt32LE(24)

    #getUncompressedSizeInfo = () => {

        const value = this.getUncompressedSize()
        return '(' + this.#toHex(value) + ')'
    }

    getFileNameLength = () => this.#buffer.readUInt16LE(28)

    #getFileNameLengthInfo = () => {

        const value =  this.getFileNameLength()
        return '(' + this.#toHex(value) + ')'
    }

    getExtraFieldLength = () => this.#buffer.readUInt16LE(30)

    #getExtraFieldLengthInfo = () => {

        const value = this.getExtraFieldLength()
        return '(' + this.#toHex(value) + ')'
    }

    getFileCommentLength = () => this.#buffer.readUInt16LE(32)

    #getFileCommentLengthInfo = () => {

        const value = this.getFileCommentLength()
        return '(' + this.#toHex(value) + ')'
    }

    getDiskNumberStart = () => this.#buffer.readUInt16LE(34)

    #getDiskNumberStartInfo = () => {

        const value = this.getDiskNumberStart()
        return '(' + this.#toHex(value) + ')'
    }

    getInternalFileAttributes = () => this.#buffer.readUInt16LE(36)

    #getInternalFileAttributesInfo = () => {

        const value = this.getInternalFileAttributes()

        const internalFileAttributesInfo = []

        for (let i = 0; i < 16; i++) {

            const bit = value & Math.pow(2, i)

            if (CentralHeaderInfo.INTERNAL_ATTRIBUTES_MAPPING[bit] !== undefined)
                internalFileAttributesInfo.push(CentralHeaderInfo.INTERNAL_ATTRIBUTES_MAPPING[bit])
        }
    }

    getExternalFileAttributes = () => this.#buffer.readUInt32LE(38)

    #getExternalFileAttributesInfo = () => {

        const value = this.getExternalFileAttributes()
        return '(' + this.#toHex(value) + ')'
    }


    getOffsetOfLocalFileHeader = () => this.#buffer.readUInt32LE(42)

    #getOffsetOfLocalFileHeaderInfo = () => {

        const value = this.getOffsetOfLocalFileHeader()
        return '(' + this.#toHex(value) + ')'
    }


    getFileName = () => this.#buffer.toString('utf8', 46, 46 + this.getFileNameLength())

    getExtraField = () => this.#buffer.toString('hex', 46 + this.getFileNameLength(), 46 + this.getFileNameLength() + this.getExtraFieldLength())


    getFileComment = () => this.#buffer.toString('utf8', 46 + this.getFileNameLength() + this.getExtraFieldLength(), 46 + this.getFileNameLength() + this.getExtraFieldLength() + this.getFileCommentLength())

    getHeaderLength = () => CentralHeaderInfo.HEADER_FIXED_LENGTH + this.getFileNameLength() + this.getExtraFieldLength() + this.getFileCommentLength()

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()

    #getHeaderLengthInfo = () => '(' + this.#toHex(this.getHeaderLength()) + ')'
*/

    #toHex = (value) => `0x${value.toString(16).toUpperCase()}`

    /*
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
    */

   toString = () => {

    let str = ''

    str += '[ CENTRAL FILE HEADER ]' + EOL

    str += 'Signature                         : ' + this.#getSignatureInfo()                                                                           + EOL
    str += 'Version made by                   : ' + this.getVersionMadeBy()                      + ' ' + this.#getVersionMadeByInfo()                  + EOL

    str += '[ CENTRAL FILE HEADER | LENGTH ' + this.getHeaderLength() + ' ' + this.#getHeaderLengthInfo() + ' ]' + EOL

    return str
}
}

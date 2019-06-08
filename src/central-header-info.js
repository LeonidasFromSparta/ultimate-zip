import {EOL} from 'os'
import CentralHeaderSerializer from './central-header-serializer'
import * as constants from './mappings'

export default class CentralHeaderInfo {

    constructor(header) {

        this.header = header
    }

    getSignatureInfo = () => {

        return '(' + this.toHex(CentralHeaderSerializer.SIGNATURE) + ')'
    }

    getVersionMadeByInfo = () => {

        const value = this.header.getVersionMadeBy()
        return value + ' (' + this.toHex(value) + ') .ZIP Version ' + (value / 10).toFixed(1)
    }

    getPlatformCompatibilityInfo = () => {

        const value = this.header.getPlatformCompatibility()
        const platform = constants.PLATFORM[value] ? constants.PLATFORM[value] : 'Unknown compatible platform'

        return value + ' (' + this.toHex(value) + ')' + ' Platform ' + platform
    }

    getVersionNeededToExtractInfo = () => {

        const value = this.header.getVersionNeededToExtract()
        return value + ' (' + this.toHex(value) + ') .ZIP Version ' + (value / 10).toFixed(1)
    }

    getGeneralPurposeBitFlagInfo = () => {

        const value = this.header.getGeneralPurposeBitFlag()
        const bitFlagInfo = []

        if ((value & 1) === 1)
            bitFlagInfo.push(constants.GENERAL_BIT_FLAG[1])

        const method = this.header.getCompressionMethod()

        if (method === constants.DEFLATE || method === constants.DEFLATE64)
            bitFlagInfo.push(constants.DEFLATE_BIT_FLAG[(value & 0x06)])

        if (method === constants.IMPLODED)
            bitFlagInfo.push(constants.IMPLODED_BIT_FLAG[(value & 0x06)])

        for (let i = 3; i < 16; i++)
            if ((value & Math.pow(2, i)) === Math.pow(2, i))
                bitFlagInfo.push(constants.GENERAL_BIT_FLAG[value & Math.pow(2, i)])

        let bitInfo = ''

        for (let i=0; i < bitFlagInfo.length; i++)
            bitInfo += ' '.repeat(35) + ' - ' + bitFlagInfo[i]

       return value + ' (' + this.toHex(value) + ')' + EOL + bitInfo
    }

    getCompressionMethodInfo = () => {

        const value = this.header.getCompressionMethod()
        const method = constants.COMPRESSION_METHOD[value] ? constants.COMPRESSION_METHOD[value] : 'Unknown compression method'

        return value + ' (' + this.toHex(value) + ') ' + method
    }

    getLastModFileTimeInfo = () => {

        const value = this.header.getLastModFileTime()

        const seconds = (value & 0x1F).toString().padStart(2, '0')
        const minutes = ((value & 0x7E0) >>> 5).toString().padStart(2, '0')
        const hours = ((value & 0xF800) >>> 11).toString().padStart(2, '0')

        return value + ' (' + this.toHex(value) + ') ' + hours + ':' + minutes + ':' + seconds
    }

    getLastModFileDateInfo = () => {

        const value = this.header.getLastModFileDate()

        const day = (value & 0x1F).toString().padStart(2, '0')
        const month = ((value & 0x1E0) >>> 5).toString().padStart(2, '0')
        const year = (((value & 0xFE00) >>> 9) + 1980).toString().padStart(4, '0')

        return value + ' (' + this.toHex(value) + ') ' + day + '/' + month + '/' + year
    }

    getCRC32Info = () => {

        const value = this.header.getCRC32()
        return value + ' (' + this.toHex(value) + ')'
    }

    getCompressedSizeInfo = () => {

        const value = this.header.getCompressedSize()
        return value + ' (' + this.toHex(value) + ')'
    }

    getUncompressedSizeInfo = () => {

        const value = this.header.getUncompressedSize()
        return value + ' (' + this.toHex(value) + ')'
    }

    getFileNameLengthInfo = () => {

        const value =  this.header.getFileName().length
        return value + ' (' + this.toHex(value) + ')'
    }

    getExtraFieldLengthInfo = () => {

        const value = this.header.getExtraField().length
        return value + ' (' + this.toHex(value) + ')'
    }

    getFileCommentLengthInfo = () => {

        const value = this.header.getFileComment().length
        return value + ' (' + this.toHex(value) + ')'
    }

    getDiskNumberStartInfo = () => {

        const value = this.header.getDiskNumberStart()
        return value + ' (' + this.toHex(value) + ')'
    }

    getInternalFileAttributesInfo = () => {

        const value = this.header.getInternalFileAttributes()
        const bitFlagInfo = []

        if ((value & 1) === 0)
            bitFlagInfo.push(constants.INTERNAL_ATTRIBUTES[0])

        if ((value & 1) === 1)
            bitFlagInfo.push(constants.INTERNAL_ATTRIBUTES[1])

        if ((value & 2) === 2)
            bitFlagInfo.push(constants.INTERNAL_ATTRIBUTES[2])

        if ((value & 4) === 4)
            bitFlagInfo.push(constants.INTERNAL_ATTRIBUTES[4])

        let bitInfo = ''

        for (let i=0; i < bitFlagInfo.length; i++)
            bitInfo += ' '.repeat(35) + ' - ' + bitFlagInfo[i]

       return value + ' (' + this.toHex(value) + ')' + EOL + bitInfo
    }

    getExternalFileAttributesInfo = () => {

        const value = this.header.getExternalFileAttributes()

        if (this.header.getPlatformCompatibility() === constants.MSDOS) {

            const bitFlagInfo = []

            if ((value & 1) === 1)
                bitFlagInfo.push(constants.MSDOS_FILE_ATTRIBUTES[1])

            if ((value & 2) === 2)
                bitFlagInfo.push(constants.MSDOS_FILE_ATTRIBUTES[2])

            if ((value & 4) === 4)
                bitFlagInfo.push(constants.MSDOS_FILE_ATTRIBUTES[4])

            if ((value & 32) === 32)
                bitFlagInfo.push(constants.MSDOS_FILE_ATTRIBUTES[32])

            let bitInfo = ''

            for (let i=0; i < bitFlagInfo.length; i++)
                bitInfo += ' '.repeat(35) + ' - ' + bitFlagInfo[i]

           return value + ' (' + this.toHex(value) + ')' + EOL + bitInfo
        }
    }

    getOffsetOfLocalFileHeaderInfo = () => {

        const value = this.header.getOffsetOfLocalFileHeader()
        return value + ' (' + this.toHex(value) + ')'
    }

    getFileNameInfo = () => {

        return this.header.getFileName()
    }

    getExtraFieldInfo = () => {

        return this.header.getExtraField().toString('hex')
    }

    getFileCommentInfo = () => {

        return this.header.getFileComment()
    }

    getHeaderLengthInfo = () => {

        const value = this.header.getHeaderLength()
        return value + ' (' + this.toHex(value) + ')'
    }

    toHex = (value) => {

        return '0x' + value.toString(16).toUpperCase()
    }

    toString = () => {

        let str = ''

        str += '[ CENTRAL FILE HEADER ]'                                                                     + EOL

        str += 'Signature                         : ' + this.getSignatureInfo()                              + EOL
        str += 'Version made by                   : ' + this.getVersionMadeByInfo()                          + EOL
        str += 'Platform compatiblity             : ' + this.getPlatformCompatibilityInfo()                  + EOL
        str += 'Version needed to extract         : ' + this.getVersionNeededToExtractInfo()                 + EOL
        str += 'General purpose bit flag          : ' + this.getGeneralPurposeBitFlagInfo()                  + EOL
        str += 'Compression method                : ' + this.getCompressionMethodInfo()                      + EOL
        str += 'Last mod file time                : ' + this.getLastModFileTimeInfo()                        + EOL
        str += 'Last mod file date                : ' + this.getLastModFileDateInfo()                        + EOL
        str += 'CRC-32                            : ' + this.getCRC32Info()                                  + EOL
        str += 'Compressed size                   : ' + this.getCompressedSizeInfo()                         + EOL
        str += 'Uncompressed size                 : ' + this.getUncompressedSizeInfo()                       + EOL
        str += 'File name length                  : ' + this.getFileNameLengthInfo()                         + EOL
        str += 'Extra field length                : ' + this.getExtraFieldLengthInfo()                       + EOL
        str += 'File comment length               : ' + this.getFileCommentLengthInfo()                      + EOL
        str += 'Disk number start                 : ' + this.getDiskNumberStartInfo()                        + EOL
        str += 'Internal file attributes          : ' + this.getInternalFileAttributesInfo()                 + EOL
        str += 'External file attributes          : ' + this.getExternalFileAttributesInfo()                 + EOL
        str += 'Relative offset of local header   : ' + this.getOffsetOfLocalFileHeaderInfo()                + EOL
        str += 'File name                         : ' + this.getFileNameInfo()                               + EOL
        str += 'Extra field                       : ' + this.getExtraFieldInfo()                             + EOL
        str += 'File comment                      : ' + this.getFileCommentInfo()                            + EOL

        str += '[ CENTRAL FILE HEADER | LENGTH ' + this.getHeaderLengthInfo() + ' ]'                         + EOL

        return str
    }
}

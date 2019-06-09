import {EOL} from 'os'
import * as constants from './contants'

export default class LocalHeaderInfo {

    constructor(header) {

        this.header = header
    }

    getPlatformNeededToExtractInfo = () => {

        const value = this.header.getPlatformNeededToExtract()
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
        return this.toHex(value)
    }

    getCompressedSizeInfo = () => {

        const value = this.header.getCompressedSize()
        return value + ' bytes'
    }

    getUncompressedSizeInfo = () => {

        const value = this.header.getUncompressedSize()
        return value + ' bytes'
    }

    getFileNameLengthInfo = () => {

        const value =  this.header.getFileName().length
        return value + ' characters'
    }

    getExtraFieldLengthInfo = () => {

        const value = this.header.getExtraField().length
        return value + ' bytes'
    }

    getFileNameInfo = () => {

        return this.header.getFileName()
    }

    getExtraFieldInfo = () => {

        return this.header.getExtraField().toString('hex')
    }

    getHeaderLengthInfo = () => {

        const value = this.header.getHeaderLength()
        return value + ' bytes'
    }

    toHex = (value) => {

        return '0x' + value.toString(16).toUpperCase()
    }

    toString = () => {

        let str = ''

        str += '[ LOCAL FILE HEADER ]'                                                                       + EOL

        str += 'Version needed to extract         : ' + this.getVersionNeededToExtractInfo()                 + EOL
        str += 'Platform needed to extract        : ' + this.getPlatformNeededToExtractInfo()                + EOL
        str += 'General purpose bit flag          : ' + this.getGeneralPurposeBitFlagInfo()                  + EOL
        str += 'Compression method                : ' + this.getCompressionMethodInfo()                      + EOL
        str += 'Last mod file time                : ' + this.getLastModFileTimeInfo()                        + EOL
        str += 'Last mod file date                : ' + this.getLastModFileDateInfo()                        + EOL
        str += 'CRC-32                            : ' + this.getCRC32Info()                                  + EOL
        str += 'Compressed size                   : ' + this.getCompressedSizeInfo()                         + EOL
        str += 'Uncompressed size                 : ' + this.getUncompressedSizeInfo()                       + EOL
        str += 'File name length                  : ' + this.getFileNameLengthInfo()                         + EOL
        str += 'Extra field length                : ' + this.getExtraFieldLengthInfo()                       + EOL
        str += 'File name                         : ' + this.getFileNameInfo()                               + EOL
        str += 'Extra field                       : ' + this.getExtraFieldInfo()                             + EOL

        str += '[ LOCAL FILE HEADER | Length ' + this.getHeaderLengthInfo() + ' ]'                           + EOL

        return str
    }
}

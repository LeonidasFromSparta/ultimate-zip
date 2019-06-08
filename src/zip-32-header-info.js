import {EOL} from 'os'
import Zip32HeaderSerializer from './zip-32-header-serializer'

export default class Zip32HeaderInfo {

    constructor(header) {

        this.header = header
    }

    getSignatureInfo = () => {

        return '(' + this.toHex(Zip32HeaderSerializer.SIGNATURE) + ')'
    }

    getNumberOfThisDiskInfo = () => {

        const value = this.header.getNumberOfThisDisk()
        return value + ' (' + this.toHex(value) + ')'
    }

    getNumberOfDiskWhereCentralDirectoriesStartInfo = () => {

        const value = this.header.getNumberOfDiskWhereCentralDirectoriesStart()
        return value + ' (' + this.toHex(value) + ')'
    }

    getNumberOfCentralDirectoriesOnThisDiskInfo = () => {

        const value = this.header.getNumberOfCentralDirectoriesOnThisDisk()
        return value + ' (' + this.toHex(value) + ')'
    }

    getNumberOfCentralDirectoriesInfo = () => {

        const value = this.header.getNumberOfCentralDirectories()
        return value + ' (' + this.toHex(value) + ')'
    }

    getSizeOfCentralDirectoriesInfo = () => {

        const value = this.header.getSizeOfCentralDirectories()
        return value + ' (' + this.toHex(value) + ')'
    }

    getCentralDirectoriesOffsetWithStartingDiskInfo = () => {

        const value = this.header.getCentralDirectoriesOffsetWithStartingDisk()
        return value + ' (' + this.toHex(value) + ')'
    }

    getZipFileCommentLengthInfo = () => {

        const value = this.header.getZipFileComment().length
        return value + ' (' + this.toHex(value) + ')'
    }

    getZipFileCommentInfo = () => {

        return this.header.getZipFileComment()
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

        str += '[ END OF CENTRAL DIRECTORY HEADER ]'                                                                              + EOL

        str += 'Signature                                      : ' + this.getSignatureInfo()                                      + EOL
        str += 'Number of this disk                            : ' + this.getNumberOfThisDiskInfo()                               + EOL
        str += 'Number of disk where central directories start : ' + this.getNumberOfDiskWhereCentralDirectoriesStartInfo()       + EOL
        str += 'Number of central directories on this disk     : ' + this.getNumberOfCentralDirectoriesOnThisDiskInfo()           + EOL
        str += 'Number of central directories                  : ' + this.getNumberOfCentralDirectoriesInfo()                     + EOL
        str += 'Size of central directories                    : ' + this.getSizeOfCentralDirectoriesInfo()                       + EOL
        str += 'Central directories offset with starting disk  : ' + this.getCentralDirectoriesOffsetWithStartingDiskInfo()       + EOL
        str += 'ZIP file comment length                        : ' + this.getZipFileCommentLengthInfo()                           + EOL
        str += 'ZIP file comment                               : ' + this.getZipFileCommentInfo()                                 + EOL

        str += '[ END OF CENTRAL DIRECTORY HEADER | LENGTH ' + this.header.getHeaderLength() + ' ]' + EOL

        return str
    }
}

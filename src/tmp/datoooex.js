import {EOL} from 'os'

export default class Zip32Header {

    static HEADER_FIXED_LENGTH = 22
    static MAX_ZIP_COMMENT_LENGTH = 65536
    static SIGNATURE = 0x06054b50

    #buffer

    constructor(buffer) {

        this.#buffer = buffer
    }

    /**
     * Method checks header signature.
     */
    checkSignature = () => {

        if (Zip32Header.SIGNATURE !== this.getSignature())
            throw `End of Central Directory Record' header signature could not be verified: expected ${Zip32Header.SIGNATURE}, actual ${this.getSignature()}`
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
     * Method reads number of this disk.
     * Offset 4, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.19
     */
    getNumberOfThisDisk = () => this.#buffer.readUInt16LE(4)

    #getNumberOfThisDiskInfo = () => {

        const value = this.getNumberOfThisDisk()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads number of the disk where central directory starts.
     * Offset 6, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.20
     */
    getNumberOfDiskWhereCentralDirectoriesStart = () => this.#buffer.readUInt16LE(6)

    #getNumberOfDiskWhereCentralDirectoriesStartInfo = () => {

        const value = this.getNumberOfDiskWhereCentralDirectoriesStart()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads total number of central directories on this disk.
     * Offset 8, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.21
     */
    getNumberOfCentralDirectoriesOnThisDisk = () => this.#buffer.readUInt16LE(8)

    #getNumberOfCentralDirectoriesOnThisDiskInfo = () => {

        const value = this.getNumberOfCentralDirectoriesOnThisDisk()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads total number of central directories.
     * Offset 10, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.22
     */
    getNumberOfCentralDirectories = () => this.#buffer.readUInt16LE(10)

    #getNumberOfCentralDirectoriesInfo = () => {

        const value = this.getNumberOfCentralDirectories()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads total size of the central directories.
     * Offset 12, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.23
     */
    getSizeOfCentralDirectories = () => this.#buffer.readUInt32LE(12)

    #getSizeOfCentralDirectoriesInfo = () => {

        const value = this.getSizeOfCentralDirectories()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads offset of start of central directory with respect to the starting disk number.
     * Offset 16, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.24
     */
    getCentralDirectoriesOffsetWithStartingDisk = () => this.#buffer.readUInt32LE(16)

    #getCentralDirectoriesOffsetWithStartingDiskInfo = () => {

        const value = this.getCentralDirectoriesOffsetWithStartingDisk()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * MEthod reads .ZIP file comment length.
     * Offset 20, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.25
     */
    getZipFileCommentLength = () => this.#buffer.readUInt16LE(20)

    #getZipFileCommentLengthInfo = () => {

        const value = this.getZipFileCommentLength()
        return '(' + this.#toHex(value) + ')'
    }

    /**
     * Method reads zip file comment.
     * Offset 22, variable size (max 64kb).
     */
    getZipFileComment = () => this.#buffer.toString('utf8', 22, this.getZipFileCommentLength())

    #toHex = (value) => `0x${value.toString(16).toUpperCase()}`

    #getHeaderLength = () => Zip32Header.HEADER_FIXED_LENGTH + this.getZipFileCommentLength()

    #getHeaderLengthInfo = () => '(' + this.#toHex(this.#getHeaderLength()) + ')'

    toString = () => {

        let str = ''

        str += '[ END OF CENTRAL DIRECTORY HEADER ]' + EOL

        str += 'Signature                                      : ' + this.#getSignatureInfo()                                                                                           + EOL
        str += 'Number of this disk                            : ' + this.getNumberOfThisDisk()                         + ' ' + this.#getNumberOfThisDiskInfo()                         + EOL
        str += 'Number of disk where central directories start : ' + this.getNumberOfDiskWhereCentralDirectoriesStart() + ' ' + this.#getNumberOfDiskWhereCentralDirectoriesStartInfo() + EOL
        str += 'Number of central directories on this disk     : ' + this.getNumberOfCentralDirectoriesOnThisDisk()     + ' ' + this.#getNumberOfCentralDirectoriesOnThisDiskInfo()     + EOL
        str += 'Number of central directories                  : ' + this.getNumberOfCentralDirectories()               + ' ' + this.#getNumberOfCentralDirectoriesInfo()               + EOL
        str += 'Size of central directories                    : ' + this.getSizeOfCentralDirectories()                 + ' ' + this.#getSizeOfCentralDirectoriesInfo()                 + EOL
        str += 'Central directories offset with starting disk  : ' + this.getCentralDirectoriesOffsetWithStartingDisk() + ' ' + this.#getCentralDirectoriesOffsetWithStartingDiskInfo() + EOL
        str += 'ZIP file comment length                        : ' + this.getZipFileCommentLength()                     + ' ' + this.#getZipFileCommentLengthInfo()                     + EOL
        str += 'ZIP file comment                               : ' + this.getZipFileComment()                                                                                           + EOL

        str += '[ END OF CENTRAL DIRECTORY HEADER | LENGTH ' + this.#getHeaderLength() + ' ' + this.#getHeaderLengthInfo() + ' ]' + EOL

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

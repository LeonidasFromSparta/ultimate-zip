import os from 'os'

export default class CDH {

    static HEADER_FIXED_LENGTH = 46
    static SIGNATURE = 0x02014b50

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

    static VERSION_NEEDED_TO_EXTRACT = {

        10: ['Default value'],
        11: ['File is a volume label'],
        20: ['File is a folder (directory)', 'File is compressed using Deflate compression', 'File is encrypted using traditional PKWARE encryption'],
        21: ['File is compressed using Deflate64(tm)'],
        25: ['File is compressed using PKWARE DCL Implode'],
        27: ['File is a patch data set'],
        45: ['File uses ZIP64 format extensions'],
        46: ['File is compressed using BZIP2 compression*'],
        50: ['File is encrypted using DES, File is encrypted using 3DES', 'File is encrypted using original RC2 encryption', 'File is encrypted using RC4 encryption'],
        51: ['File is encrypted using AES encryption', 'File is encrypted using corrected RC2 encryption**'],
        52: ['File is encrypted using corrected RC2-64 encryption**'],
        61: ['File is encrypted using non-OAEP key wrapping***'],
        62: ['Central directory encryption'],
        63: ['File is compressed using LZMA', 'File is compressed using PPMd+', 'File is encrypted using Blowfish', 'File is encrypted using Twofish']
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

    static COMPRESSION_METHOD_MAPPING = {

        0: 'The file is stored (no compression)',
        1: 'The file is Shrunk',
        2: 'The file is Reduced with compression factor 1',
        3: 'The file is Reduced with compression factor 2',
        4: 'The file is Reduced with compression factor 3',
        5: 'The file is Reduced with compression factor 4',
        6: 'The file is Imploded',
        7: 'Reserved for Tokenizing compression algorithm',
        8: 'The file is Deflated',
        9: 'Enhanced Deflating using Deflate64(tm)',
       10: 'PKWARE Data Compression Library Imploding (old IBM TERSE)',
       11: 'Reserved by PKWARE',
       12: 'File is compressed using BZIP2 algorithm',
       13: 'Reserved by PKWARE',
       14: 'LZMA',
       15: 'Reserved by PKWARE',
       16: 'IBM z/OS CMPSC Compression',
       17: 'Reserved by PKWARE',
       18: 'File is compressed using IBM TERSE (new)',
       19: 'IBM LZ77 z Architecture (PFS)',
       96: 'JPEG variant',
       97: 'WavPack compressed data',
       98: 'PPMd version I, Rev 1',
       99: 'AE-x encryption marker (see APPENDIX E)'
    }

    static INTERNAL_ATTRIBUTES_MAPPING = {

        16384: '(Bit 1) Reserved for use by PKWARE',
        8192:  '(Bit 2) Reserved for use by PKWARE',
        2:     '(Bit 14) A 4 byte variable record length control field precedes each logical record (mainframe data transfer support) LOL!',
        1:     '(Bit 15) File is an ASCII or text file'
    }

    constructor(buffer) {

        this.verifySignature(buffer)
        this.readVersionMadeBy(buffer)
        this.readVersionNeededToExtract(buffer)
        this.readGeneralPurposeBitFlag(buffer)
        this.readCompressionMethod(buffer)
        this.readLastModFileTime(buffer)
        this.readLastModFileDate(buffer)
        this.readCRC32(buffer)
        this.readCompressedSize(buffer)
        this.readUncompressedSize(buffer)
        this.readFilenameLength(buffer)
        this.readExtraFieldLength(buffer)
        this.readFileCommentLength(buffer)
        this.readDiskNumberStart(buffer)
        this.readInternalFileAttributes(buffer)
        this.readExternalFileAttributes(buffer)
        this.readRelativeOffsetOfLocalHeader(buffer)

        this.variableHeaderLength = this.fileNameLength + this.extraFieldLength + this.fileCommentLength
        this.totalHeaderLength = CDH.HEADER_FIXED_LENGTH + this.fileNameLength + this.extraFieldLength + this.fileCommentLength
    }

    readVariableData(buffer) {

        this.readFileName(buffer, this.fileNameLength)
        this.readExtraField(buffer, this.fileNameLength, this.extraFieldLength)
        this.readFileComment(buffer, this.fileNameLength + this.extraFieldLength, this.fileCommentLength)
    }

    /**
     * Verify central directory header (CDH) signature.
     * Offset 0, 4 bytes (32 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    verifySignature(buffer) {

        if (CDH.SIGNATURE !== buffer.readUInt32LE(0))
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
    readVersionMadeBy(buffer) {

        const value = buffer.readUInt16LE(4)

        const zipSpecVer = buffer.readUInt8(4)
        const zipSpecVerInfo = `${zipSpecVer / 10}`

        const platform = buffer.readUInt8(5)
        const platformInfo = CDH.PLATFORM_MAPPING[platform] ? CDH.PLATFORM_MAPPING[platform] : 'Unknown compatible platform'

        this.versionMadeBy = {value, platform, platformInfo, zipSpecVer, zipSpecVerInfo}
    }

    /**
     * Read version needed to extract.
     * Offset 6, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.3
     *
     * Undocumented by .ZIP:
     * HI part (8 bit) offset 6, LO part (8 bit) offset 7
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readVersionNeededToExtract(buffer) {

        const value = buffer.readUInt16LE(6)
        const info = CDH.VERSION_NEEDED_TO_EXTRACT[value] ? CDH.VERSION_NEEDED_TO_EXTRACT[value] : ['not specified by APPNOTE.TXT - .ZIP File Format Specification']

        this.versionNeededToExtract = {value, info}
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

            if (CDH.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit] !== undefined)
                this.generalPurposeBitFlagInfo.push(CDH.GENERAL_PURPOSE_BIT_FLAG_MAPPING[bit])
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
    readCompressionMethod(buffer) {

        this.compressionMethod = buffer.readUInt16LE(10)
        this.compressionMethodInfo = CDH.COMPRESSION_METHOD_MAPPING[this.compressionMethod] ? CDH.COMPRESSION_METHOD_MAPPING[this.compressionMethod] : 'not specified by APPNOTE.TXT - .ZIP File Format Specification'
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
    readLastModFileTime(buffer) {

        this.lastModFileTime = buffer.readUInt16LE(12)

        const seconds = this.lastModFileTime & 0x1F
        const minutes = (this.lastModFileTime & 0x7E0) >>> 5
        const hours = (this.lastModFileTime & 0xF800) >>> 11

        this.lastModFileTimeInfo = `${hours}:${minutes}:${seconds}`
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

        this.lastModFileDate = buffer.readUInt16LE(14)

        const day = this.lastModFileDate & 0x1F
        const month = (this.lastModFileDate & 0x1E0) >>> 5
        const year = ((this.lastModFileDate & 0xFE00) >>> 9) + 1980

        this.lastModFileDateInfo = `${day}/${month}/${year}`
    }

    /**
     * Read crc-32.
     * Offset 16, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.7
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCRC32(buffer) {

        this.crc32 = buffer.readUInt32LE(16)
    }

    /**
     * Read compressed size.
     * Offset 20, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.8
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readCompressedSize(buffer) {

        this.compressedSize = buffer.readUInt32LE(20)
    }

    /**
     * Read uncompressed size.
     * Offset 24, 4 bytes (32 bit).
     *
     * .ZIP File Format Specification: sections 4.4.9
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readUncompressedSize(buffer) {

        this.uncompressedSize = buffer.readUInt32LE(24)
    }

    /**
     * Read file name length.
     * Offset 28, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.10
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFilenameLength(buffer) {

        this.fileNameLength = buffer.readUInt16LE(28)
    }

    /**
     * Read extra field length.
     * Offset 30, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.11
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readExtraFieldLength(buffer) {

        this.extraFieldLength = buffer.readUInt16LE(30)
    }

    /**
     * Read file comment length.
     * Offset 32, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.12
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readFileCommentLength(buffer) {

        this.fileCommentLength = buffer.readUInt16LE(32)
    }

    /**
     * Read disk number start.
     * Offset 34, 2 bytes (16 bit).
     *
     * .ZIP File Format Specification: sections 4.4.13
     *
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readDiskNumberStart(buffer) {

        this.diskNumberStart = buffer.readUInt16LE(34)
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

            if (CDH.INTERNAL_ATTRIBUTES_MAPPING[bit] !== undefined)
                this.internalFileAttributesInfo.push(CDH.INTERNAL_ATTRIBUTES_MAPPING[bit])
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

        this.externalFileAttributes = buffer.readUInt32LE(38)
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

        this.relativeOffsetOfLocalHeader = buffer.readUInt32LE(42)
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
     * Read file comment (variable size).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {buffer} addedOffset The file name and extra field lengths additonal offset.
     * @param {buffer} length The length of the file comment.
     */
    readFileComment(buffer, addedOffset, length) {

        this.fileComment = buffer.toString('utf', addedOffset, addedOffset + length)
    }

    toHex(value) {

        return `0x${value.toString(16).toUpperCase()}`
    }

    toString() {

        let str = ''

        str += `[ CENTRAL DIRECTORY ]${os.EOL}`
        str += `Signature                         : ${this.toHex(CDH.SIGNATURE)}${os.EOL}`
        str += `Version made by                   : ${this.versionMadeBy.value} (${this.toHex(this.versionMadeBy.value)})${os.EOL}`
        str += `    Platfrom compatibility        : ${this.versionMadeBy.platform} (${this.toHex(this.versionMadeBy.platform)}) ${this.versionMadeBy.platformInfo}${os.EOL}`
        str += `    Zip Spec version              : ${this.versionMadeBy.zipSpecVer} (0x${this.versionMadeBy.zipSpecVer.toString(16).toUpperCase()}) ${this.versionMadeBy.zipSpecVerInfo}${os.EOL}`
        str += `Version needed to extract         : ${this.versionNeededToExtract.value} (${this.toHex(this.versionNeededToExtract.value)})${os.EOL}`
        str += this.versionNeededToExtract.info.reduce((accu, obj) => accu += `${' '.repeat(36)}${obj}${os.EOL}`, '')
        str += `General purpose bit flag          : ${this.generalPurposeBitFlag} (0x${this.generalPurposeBitFlag.toString(16).toUpperCase()})${os.EOL}`
        str += this.generalPurposeBitFlagInfo.reduce((accu, obj) => accu += `${' '.repeat(36)}${obj}${os.EOL}`, '')
        str += `Compression method                : ${this.compressionMethod} (0x${this.compressionMethod.toString(16).toUpperCase()})${os.EOL}`
        str += `                                    ${this.compressionMethodInfo}${os.EOL}`
        str += `Last mod file time                : ${this.lastModFileTime} (0x${this.lastModFileTime.toString(16).toUpperCase()})${os.EOL}`
        str += `                                    ${this.lastModFileTimeInfo}${os.EOL}`
        str += `Last mod file date                : ${this.lastModFileDate} (0x${this.lastModFileDate.toString(16).toUpperCase()})${os.EOL}`
        str += `                                    ${this.lastModFileDateInfo}${os.EOL}`
        str += `CRC-32                            : ${this.crc32} (0x${this.crc32.toString(16).toUpperCase()})${os.EOL}`
        str += `Compressed size                   : ${this.compressedSize} (0x${this.compressedSize.toString(16).toUpperCase()})${os.EOL}`
        str += `Uncompressed size                 : ${this.uncompressedSize} (0x${this.uncompressedSize.toString(16).toUpperCase()})${os.EOL}`
        str += `File name legth                   : ${this.fileNameLength} (0x${this.fileNameLength.toString(16).toUpperCase()})${os.EOL}`
        str += `Extra field length                : ${this.extraFieldLength} (0x${this.extraFieldLength.toString(16).toUpperCase()})${os.EOL}`
        str += `File comment length               : ${this.fileCommentLength} (0x${this.fileCommentLength.toString(16).toUpperCase()})${os.EOL}`
        str += `Disk number start                 : ${this.diskNumberStart} (0x${this.diskNumberStart.toString(16).toUpperCase()})${os.EOL}`
        str += `Internal file attributes          : ${this.internalFileAttributes} (0x${this.internalFileAttributes.toString(16).toUpperCase()})${os.EOL}`
        str += this.internalFileAttributesInfo.reduce((accu, obj) => accu += `${' '.repeat(36)}${obj}${os.EOL}`, '')
        str += `External file attributes          : ${this.externalFileAttributes} (0x${this.externalFileAttributes.toString(16).toUpperCase()})${os.EOL}`
        str += `Relative offset of local header   : ${this.relativeOffsetOfLocalHeader} (0x${this.relativeOffsetOfLocalHeader.toString(16).toUpperCase()})${os.EOL}`
        str += `File name                         : ${this.fileName}${os.EOL}`
        str += `Extra field                       : ${this.extraField}${os.EOL}`
        str += `File comment                      : ${this.fileComment}${os.EOL}`
        str += `[ CENTRAL DIRECTORY LENGTH ${this.totalHeaderLength} (0x${this.totalHeaderLength.toString(16).toUpperCase()}) ]`

        return str
    }
}

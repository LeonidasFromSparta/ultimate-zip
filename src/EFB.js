export default class EFH {

    static HEADER_ID_MAPPING = {
        '0x1': '0x0001 - Zip64 extended information extra field',
        '0x7': '0x0007 - AV Info',
        '0x8': '0x0008 - Reserved for extended language encoding data (PFS)',
        '0x9': '0x0009 - OS/2',
        '0xA': '0x000A - NTFS',
        '0xC': '0x000C - OpenVMS',
        '0xD': '0x000D - UNIX',
        '0xE': '0x000E - Reserved for file stream and fork descriptors',
        '0xF': '0x000F - Patch Descriptor',
        '0x14': '0x0014 - PKCS#7 Store for X.509 Certificates',
        '0x15': '0x0015 - X.509 Certificate ID and Signature for individual file',
        '0x16': '0x0016 - X.509 Certificate ID for Central Directory',
        '0x17': '0x0017 - Strong Encryption Header',
        '0x18': '0x0018 - Record Management Controls',
        '0x19': '0x0019 - PKCS#7 Encryption Recipient Certificate List',
        '0x20': '0.0020 - Reserved for Timestamp record',
        '0x21': '0x0021 - Policy Decryption Key Record',
        '0x22': '0x0022 - Smartcrypt Key Provider Record',
        '0x23': '0x0023 - Smartcrypt Policy Key Data Record',
        '0x65': '0x0065 - IBM S/390 (Z390), AS/400 (I400) attributes - uncompressed',
        '0x66': '0x0066 - Reserved for IBM S/390 (Z390), AS/400 (I400) attributes - compressed',
        '0x4690': '0x4690 - POSZIP 4690 (reserved)'
    }

    constructor(buffer) {

        const extraFieldBuffer = buffer.slice(46 + addedOffset, 46 + addedOffset + length)

        const headerId = `0x${extraFieldBuffer.readUInt16LE(0).toString(16).toUpperCase()}`
        const headerIdFromMap = EFH.HEADER_ID_MAPPING[headerId]

        this.mappedHeaderId = headerIdFromMap ? headerIdFromMap : `${headerId} - header id doesn't exists in .ZIP spec`

        this.extraFieldContent = extraFieldBuffer.toString(undefined, 4)
    }

    /**
     * Read header id.
     * Offset 0, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readHeaderId(buffer) {

        const headerIdInt = `0x${buffer.readUInt16LE(0).toString(16).toUpperCase()}`
        const headerIdFromMap = EFH.HEADER_ID_MAPPING[headerIdInt]

        this.headerId = headerIdFromMap ? headerIdFromMap : `${headerId} - header id doesn't exists in .ZIP spec`
    }

    /**
     * Read data size.
     * Offset 0, 2 bytes (16 bit).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readDataSize(buffer) {

        this.dataSize = buffer.readUInt16LE(2)
    }
}

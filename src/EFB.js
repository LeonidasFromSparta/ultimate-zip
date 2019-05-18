export default class EFH {

    static HEADER_ID_MAPPING = {

        1: '0x0001 - Zip64 extended information extra field',
        7: '0x0007 - AV Info',
        8: '0x0008 - Reserved for extended language encoding data (PFS)',
        9: '0x0009 - OS/2',
        10: '0x000A - NTFS',
        12: '0x000C - OpenVMS',
        13: '0x000D - UNIX',
        14: '0x000E - Reserved for file stream and fork descriptors',
        15: '0x000F - Patch Descriptor',
        20: '0x0014 - PKCS#7 Store for X.509 Certificates',
        21: '0x0015 - X.509 Certificate ID and Signature for individual file',
        22: '0x0016 - X.509 Certificate ID for Central Directory',
        23: '0x0017 - Strong Encryption Header',
        24: '0x0018 - Record Management Controls',
        25: '0x0019 - PKCS#7 Encryption Recipient Certificate List',
        32: '0x0020 - Reserved for Timestamp record',
        33: '0x0021 - Policy Decryption Key Record',
        34: '0x0022 - Smartcrypt Key Provider Record',
        35: '0x0023 - Smartcrypt Policy Key Data Record',
        101: '0x0065 - IBM S/390 (Z390), AS/400 (I400) attributes - uncompressed',
        102: '0x0066 - Reserved for IBM S/390 (Z390), AS/400 (I400) attributes - compressed',
        18064: '0x4690 - POSZIP 4690 (reserved)'
    }

    static SUPPORTED_HEADER_ID_MAPPING = {

        1: '0x000A - NTFS'
    }

    constructor(buffer) {

        this.readHeaderId(buffer)
        this.readDataSize(buffer)
        this.readDataBlock(buffer, this.headerId)
    }

    /**
     * Read header id.
     * Offset 0, 2 bytes (16 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readHeaderId(buffer) {

        this.headerId = buffer.readUInt16LE(0)
    }

    /**
     * Read data size.
     * Offset 2, 2 bytes (16 bit LE).
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     */
    readDataSize(buffer) {

        this.dataSize = buffer.readUInt16LE(2)
    }

    /**
     * Read extra field data block (variable size).
     * Offset 4.
     * @param {buffer} buffer The buffer in which all the data supposed to be in.
     * @param {int} headerId The header id.
     */
    readDataBlock(buffer, headerId) {

        /*
        switch (headerId) {

            case 10: this.dataBlock = new NTFS(buffer.slice(4))

            default: this.dataBlock = buffer.toString('hex', 4)
        }
        */

        this.dataBlock = buffer.slice(4).toString()
    }
}

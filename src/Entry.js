import crc32 from './crc32'

export default class Entry {

    constructor(localFileHeader, dataBuffer) {

        this.localFileHeader = localFileHeader
        this.dataBuffer = dataBuffer
    }

    test() {

        // stored
        if (this.localFileHeader.readCompressionMethod().value === 0) {

            const crc = crc32(this.dataBuffer)

            if (this.localFileHeader.readCRC32().value !== crc)
                console.log('promplem!!!')
        }
    }
}

import crc32 from './crc32'
import FileHeader from './file-header'
import FileContent from './FileContent'

export default class Entry {

    constructor() {

        this.fileHeader = new FileHeader()
        this.fileContent = null
    }

    feedByte(byte) {

        if (!this.fileHeader.isHeaderComplete()) {

            this.fileHeader.feedByte(byte)
            return
        }

        if (this.fileContent === null)
            this.fileContent = new FileContent(this.fileHeader.getCompressedSize().value)

        if (!this.fileContent.isContentComplete())
            this.fileContent.feedByte(byte)
    }

    isFeedingDone() {

        if (this.fileHeader.isHeaderComplete() && this.fileContent !== null)
            if (this.fileContent.isContentComplete())
                return true

        return false
    }

    extract() {

        this.fileContent.extract()
    }

    test() {

        this.fileContent.extract()
        const calculatedCrc32 = this.fileContentcalculateCrc32()

        if (this.fileHeader.get)
    }
}

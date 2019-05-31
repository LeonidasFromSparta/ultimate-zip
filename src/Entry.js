import crc32 from './crc32'
import FileHeader from './FileHeader'
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
            this.fileContent = new FileContent(this.fileHeader.readCompressedSize().value)

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
}

import crc32 from './crc32'
import LocalHeader from './local-header'
import ExtLocalHeader from './ext-local-header'
import FileContent from './file-content'

export default class Entry {

    constructor() {

        this.extLocalHeader = new ExtLocalHeader()
        this.fileContent = null
    }

    addByte = (byte) => {

        if (!this.extLocalHeader.isDone()) {

            this.extLocalHeader.addByte(byte)
            return
        }

        if (this.extLocalHeader.isDone() && this.fileContent === null)
            this.fileContent = new FileContent(this.extLocalHeader.getCompressedSize())

        if (!this.fileContent.isDone())
            this.fileContent.addByte(byte)
    }

    isDone = () => {

        if (this.extLocalHeader.isDone() && this.fileContent !== null && this.fileContent.isDone())
            return true

        return false
    }

    extract() {

        this.fileContent.extract()
    }

    test = () => {

        this.fileContent.test(this.extLocalHeader.getCRC32())
    }
}

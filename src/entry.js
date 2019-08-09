import {LOCAL_HEADER_LENGTH} from './constants'
import {LOC_MAX} from './constants'
import DumpWriter from './dump-writer'
import {readLocHeader, readLocHeaderSync} from './headers'
import {inflater, inflaterSync} from './inflater'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = async (outputPath) => {

        const startPos = this.header.localOffset
        const endPos = this.header.localOffset + LOCAL_HEADER_LENGTH + this.header.fileName.length + 65536 + this.header.deflatedSize - 1
        const fileReader = this.file.createReadStream(startPos, endPos)

        await this._extract(outputPath, fileReader)

        fileReader.destroy()
    }

    _extract = async (outputPath, fileReader) => {

        const fileName = outputPath + '/' + this.header.fileName
        await this._readLocalHeader(fileReader)

        if (this.header.isDirectory())
            return await this.file.makeDir(fileName)

        const fileWriter = this.file.createWriteStream(fileName)
        await inflater(this.header, fileReader, fileWriter)
    }

    _extractSync = async (outputPath) => {

        const fileName = outputPath + '/' + this.header.fileName

        if (this.header.isDirectory())
            return this.file.makeDirSync(fileName)

        const pos = this._readLocalHeaderSync()
        const deflated = inflaterSync(pos, this.header, this.file)

        this.file.writeFileSync(fileName, deflated)
    }

    test = () => {

        const start = this.header.localOffset
        const end = this.header.localOffset + LOC_MAX - 1

        const fileReader = this.file.createReadStream(start, end)

        return this._test(fileReader)
    }

    _test = async (fileReader) => {

        await this._readLocalHeader(fileReader)

        if (this.header.isDirectory())
            return

        const dumpWriter = new DumpWriter()
        await this._inflater(fileReader, dumpWriter)
    }

    _readLocalHeader = async (fileReader) => {

        await readLocHeader(fileReader)
    }

    _readLocalHeaderSync = () => {

        const header = readLocHeaderSync(this.header.localOffset, this.file)
        return header.length
    }
}

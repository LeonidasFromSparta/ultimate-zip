import {EOL} from 'os'
import path from 'path'
import File from './file'
import Entry from './entry'
import Zip32HeaderSerializer from './zip-32-header-serializer'
import Zip32HeaderInfo from './zip-32-header-info'
import CentralHeaderTransformer from './central-header-transform'

export default class UZip {

    constructor(path) {

        this.file = new File(path)

        const zip32Bytes = this.file.readZip32HeaderBytesSync(Zip32HeaderSerializer.HEADER_MAX_LENGTH)
        this.zip32Header = Zip32HeaderSerializer.deserealize(zip32Bytes)
    }

    testArchive = async () => {

        const entries = this._readEntries()

        this.file.openFile()

        for (const entry of entries) {

            if (!entry.isDirectory())
                await entry.test(path)
        }

        this.file.closeFile()
    }

    extractArchive = async (path) => {

        const entries = this._readEntries()

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractByRegex = async (regex, path) => {

        const entries = this._readEntries().filter((obj) => obj.getFilename().test(regex))

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractFile = async (filename, path) => {

        const entries = this._readEntries().filter((obj) => obj.getFilename() === filename)

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    getEntries = () => {

        return this._readEntries()
    }

    _readEntries = async () => {

        if (this.entries)
            return this.entries

        const start = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip32Header.getSizeOfCentralDirectories() - 1 // -1 because inclusive

        const readStream = this.file.createReadStream(start, end)
        const writeStream = new CentralHeaderTransformer()

        const promise = new Promise((resolve) => {

            const headers = []

            readStream.pipe(writeStream)

            writeStream.on('data', (data) => headers.push(new Entry(data, this.file)))
            writeStream.on('finish', () => resolve(headers))
        })

        this.entries = await promise
        return this.entries
    }

    getInfo = () => {

        const entries = this._readEntries()
        // const localFileHeaders = await this.readLocalFileHeaders()

        // return this.zip32Header.toString() + EOL + centralHeaders.join(EOL) + EOL + localFileHeaders.join(EOL)
        const d = new Zip32HeaderInfo(this.zip32Header).toString() + EOL + entries.reduce((accu, obj) => accu + obj.getInfo() + EOL, '')
        return d
    }
}

import {EOL} from 'os'
import path from 'path'
import File from './file'
import Entry from './entry'
import CentralHeaderSeserializer from './central-header-serializer'
import Zip32HeaderSerializer from './zip-32-header-serializer'
import Zip32HeaderInfo from './zip-32-header-info'

export default class UZip {

    options = {}
    entries = null

    constructor(path, options) {

        this.file = new File(path)

        const zip32Bytes = this.file.readZip32HeaderBytesSync(Zip32HeaderSerializer.HEADER_MAX_LENGTH)
        this.zip32Header = Zip32HeaderSerializer.deserealize(zip32Bytes)

        this.options = options
    }

    testArchive = async () => {

        const entries = this.readEntries()

        this.file.openFile()

        for (const entry of entries) {

            if (!entry.isDirectory())
                await entry.test(path)
        }

        this.file.closeFile()
    }

    extractArchive = async (path) => {

        const entries = this.readEntries()

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractByRegex = async (regex, path) => {

        const entries = this.readEntries().filter((obj) => obj.getFilename().test(regex))

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractFile = async (filename, path) => {

        const entries = this.readEntries().filter((obj) => obj.getFilename() === filename)

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    getEntries = async () => {

        return this.readEntries()
    }

    readEntries = () => {

        if (this.entries !== null)
            return this.entries

        const centralDirectories = this.zip32Header.getNumberOfCentralDirectories()

        let startPos = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()

        const entries = []

        this.file.openFile()

        for (let i=0; i < centralDirectories; i++) {

            const buffer = this.file.readBytesSync(startPos, CentralHeaderSeserializer.HEADER_MAX_LENGTH)
            const centralHeader = CentralHeaderSeserializer.deserealize(buffer)

            entries.push(new Entry(centralHeader, this.file))
            startPos += centralHeader.getHeaderLength()
        }

        this.file.closeFile()

        if (this.options.cacheHeaders !== undefined)
            this.entries = entries

        return entries
    }

    /*
    async readLocalFileHeaders() {

        const extLocalHeaders = []
        const centralHeaders = await this.readEntries()

        for (const centralHeader of centralHeaders) {

            const promise = new Promise((resolve) => {

                const startPos = centralHeader.getOffsetOfLocalFileHeader()
                const endPos = centralHeader.getOffsetOfLocalFileHeader() + LocalHeader.HEADER_MAX_LENGTH

                const extLocalHeader = new ExtLocalHeader()

                const readStream = this.file.createReadStream(startPos, endPos)

                readStream.on('data', (chunk) => {

                    for (const byte of chunk) {

                        extLocalHeader.addByte(byte)

                        if (extLocalHeader.isDone()) {

                            readStream.destroy()
                            return
                        }
                    }
                })

                readStream.on('end', () => {

                    // ERROR
                })

                readStream.on('close', () => resolve(extLocalHeader))
            })

            const result = await promise
            extLocalHeaders.push(result)
        }

        return extLocalHeaders
    }
*/

    getInfo = () => {

        const entries = this.readEntries()
        // const localFileHeaders = await this.readLocalFileHeaders()

        // return this.zip32Header.toString() + EOL + centralHeaders.join(EOL) + EOL + localFileHeaders.join(EOL)
        const d = new Zip32HeaderInfo(this.zip32Header).toString() + EOL + entries.reduce((accu, obj) => accu + obj.getInfo() + EOL, '')
        return d
    }
}

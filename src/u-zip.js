import {EOL} from 'os'
import Zip32Header from './zip-32-header'
import ExtCentralHeader from './ext-central-header'
import LocalHeader from './local-header'
import ExtLocalHeader from './ext-local-header'
import File from './file'
import Entry2 from './Entry2'
import path from 'path'

export default class UZip {

    #options = {}
    #centralHeaders = null

    constructor(path, options) {

        this.file = new File(path)

        const lastBytesBuf = this.file.readLastBytes(Zip32Header.HEADER_FIXED_LENGTH + Zip32Header.MAX_ZIP_COMMENT_LENGTH)
        const eocdr32Offset = Zip32Header.locateHeaderStartPos(lastBytesBuf)

        this.#options = options
        this.zip32Header = new Zip32Header(lastBytesBuf.slice(eocdr32Offset))
        this.zip32Header.checkSignature()
    }

    testArchive = async () => {

        const entries = (await this.readCentralHeaders()).map((obj) => new Entry2(obj, this.file))

        this.file.openFile()

        for (const entry of entries) {

            if (!entry.isDirectory())
                await entry.test(path)
        }

        this.file.closeFile()
    }

    extractArchive = async (path) => {

        const entries = (await this.readCentralHeaders()).map((obj) => new Entry2(obj, this.file))

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractByRegex = async (regex, path) => {

        const entries = (await this.readCentralHeaders()).map((obj) => new Entry2(obj, this.file)).filter((obj) => obj.getFilename().test(regex))

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    extractFile = async (filename, path) => {

        const entries = (await this.readCentralHeaders()).map((obj) => new Entry2(obj, this.file)).filter((obj) => obj.getFilename() === filename)

        this.file.openFile()

        for (let i=0; i < entries.length; i++)
            await entries[i].extract(path)

        this.file.closeFile()
    }

    getEntries = async () => {

        return (await this.readCentralHeaders()).map((obj) => new Entry2(obj, this.file))
    }

    readCentralHeaders = async () => {

        if (this.#centralHeaders !== null)
            return this.#centralHeaders

        const startPos = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()
        const endPos = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip32Header.getSizeOfCentralDirectories()

        const promise = new Promise((resolve) => {

            const readStream = this.file.createReadStream(startPos, endPos)

            const exCentralHeaders = []
            let extCentralHeader = new ExtCentralHeader()

            readStream.on('data', (chunk) => {

                for (const byte of chunk) {

                    extCentralHeader.addByte(byte)

                    if (extCentralHeader.isDone()) {

                        extCentralHeader.finalize()
                        exCentralHeaders.push(extCentralHeader)

                        extCentralHeader = new ExtCentralHeader()
                    }
                }
            })

            readStream.on('end', () => resolve(exCentralHeaders))
        })

        const centralHeaders = await promise

        if (this.#options.cacheHeaders !== undefined)
            this.#centralHeaders = centralHeaders

        return centralHeaders
    }

    async readLocalFileHeaders() {

        const extLocalHeaders = []
        const centralHeaders = await this.readCentralHeaders()

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

    async getInfo() {

        const centralHeaders = await this.readCentralHeaders()
        const localFileHeaders = await this.readLocalFileHeaders()

        return this.zip32Header.toString() + EOL + centralHeaders.join(EOL) + EOL + localFileHeaders.join(EOL)
    }
}

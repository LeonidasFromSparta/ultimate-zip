import {EOL} from 'os'
import Zip32Header from './zip-32-header'
import CentralHeader from './central-header'
import ExtCentralHeader from './ext-central-header'
import LocalHeader from './local-header'
import ExtLocalHeader from './ext-local-header'
import File from './file'
import Entry from './Entry'
import FileContent from './file-content'
import {createInflateRaw} from 'zlib'
import fs from 'fs'
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

        return new Promise((resolve, reject) => {

            const readStream = this.file.createReadStream(0, this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk())

            let entry = new Entry()

            readStream.on('data', (chunk) => {

                for (const byte of chunk) {

                    entry.addByte(byte)

                    if (entry.isDone()) {

                        console.log(entry.extLocalHeader.getFileName())
                        entry.test()
                        entry = new Entry()
                    }
                }
            })

            readStream.on('end', () => resolve())
        })
    }

    extractAll = async (path) => {

        const headers = await this.readCentralHeaders()
        this.file.openFile()

        const arr = []

        for (const header of  headers) {

            console.log(header.toString())
            arr.push(this.extractPromise(path, header))
        }

        Promise.all(arr)

        this.file.closeFile()
    }

    extractPromise = (where, header) => {

        const filename = where + '/' + header.getFileName()

        if (header.isDirectory()) {

            return new Promise((resolve, reject) => {

                fs.mkdir(filename, {recursive: true}, () => {

                    resolve()
                })
            })
        }

        const startPos = header.getOffsetOfLocalFileHeader()
        const endPos = header.getOffsetOfLocalFileHeader() + header.getCompressedSize() + LocalHeader.HEADER_MAX_LENGTH

        if (header.isCompressed()) {

            return new Promise((resolve, reject) => {

                const readStream = this.file.createFdReadStream(startPos, endPos)
                const writeStream = fs.createWriteStream(filename, {flags: 'w'})

                readStream.pipe(createInflateRaw()).pipe(writeStream)

                writeStream.on('finish', () => resolve())
            })
        }

        if (!header.isCompressed()) {

            return new Promise((resolve, reject) => {

                if (!header.isCompressed()) {

                    const readStream = this.file.createFdReadStream(startPos, endPos)
                    const writeStream = fs.createWriteStream(filename, {flags: 'w'})

                    readStream.pipe(writeStream)

                    writeStream.on('finish', () => resolve())
                }
            })
        }
    }

    async extractFile(fileName) {

        const centralHeader = (await this.readCentralHeaders()).filter((centralHeader) => centralHeader.getFileName() === fileName)[0]

        if (centralHeader.length === 0)
            console.log('error')

        const startPos = centralHeader.getOffsetOfLocalFileHeader()
        const endPos = centralHeader.getOffsetOfLocalFileHeader() + centralHeader.getCompressedSize() + LocalHeader.HEADER_MAX_LENGTH

        const promise = new Promise((resolve, reject) => {

            const readStream = this.file.createReadStream(startPos, endPos)

            let entry = new Entry()

            readStream.on('data', (chunk) => {

                for (const byte of chunk) {

                    entry.feedByte(byte)

                    if (entry.isFeedingDone()) {

                        entry.extract()
                        entry = new Entry()
                    }
                }
            })

            readStream.on('end', () => resolve())
        })
    }

    async extractByRegex(path, regex) {

        let filteredCentralFileHeaders

        if (this.centralFileHeaders === undefined)
            filteredCentralFileHeaders = this.readCentralHeaders().filter((cfh) => regex.test(cfh.getFilename()))
        else
            filteredCentralFileHeaders = this.centralFileHeaders.filter((cfh) => regex.test(cfh.getFilename()))

        for (const centralHeader of filteredCentralFileHeaders) {

            await new Promise((resolve, reject) => {

                const readStream = this.file.createReadStream(centralHeader.getOffsetOfLocalFileHeader(), LocalHeader.HEADER_MAX_LENGTH + centralHeader.getCompressedSize())

                const entry = new Entry()

                readStream.on('data', (chunk) => {

                    for (const byte of chunk) {

                        entry.feedByte(byte)

                        if (entry.isFeedingDone()) {

                            entry.extract()
                            readStream.destroy()
                            return
                        }
                    }
                })

                readStream.on('end', () => resolve())
            })
        }
    }

    async readCentralHeaders() {

        if (this.#centralHeaders !== null)
            return this.#centralHeaders

        const startPos = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()
        const endPos = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip32Header.getSizeOfCentralDirectories()

        const promise = new Promise((resolve, reject) => {

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

            const promise = new Promise((resolve, reject) => {

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

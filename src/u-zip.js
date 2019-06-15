import {EOL} from 'os'
import File from './file'
import Entry from './entry'
import Zip32HeaderSerializer from './zip-32-header-serializer'
import Zip32HeaderInfo from './zip-32-header-info'
import CentralHeaderDecoder from './central-header-decoder'
import LocalHeaderDecoder from './local-header-decoder'
import {LOCAL_HEADER_LENGTH} from './constants'
import { CustomConsole } from '@jest/console';

export default class UZip {

    constructor(path) {

        this.file = new File(path)

        const zip32Bytes = this.file.readZip32HeaderBytesSync(Zip32HeaderSerializer.HEADER_MAX_LENGTH)
        this.zip32Header = Zip32HeaderSerializer.deserealize(zip32Bytes)
    }

    testArchive = async () => {

        const entries = await this._readEntries()
        const decoder = new LocalHeaderDecoder()
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()

        await this.file.open()
        let fileReader = this.file.createFdReadStream(0, end)

        for (let i=0; i < entries.length; i++) {

            const fileReaderPos = fileReader.start + fileReader.bytesRead - fileReader.readableLength

            if (fileReaderPos !== entries[i].header.getOffsetOfLocalFileHeader()) {

                const start = entries[i].header.getOffsetOfLocalFileHeader()
                fileReader = this.file.createFdReadStream(start, end)
            }

            await entries[i]._test(fileReader, decoder)
            decoder.reset()
        }

        await this.file.close()
    }

    extractArchive = async (outputPath) => {

        outputPath = outputPath + '/'
        const entries = await this._readEntries()
        const decoder = new LocalHeaderDecoder()
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk()

        await this.file.open()
        let fileReader = this.file.createFdReadStream(0, end)

        for (let i=0; i < entries.length; i++) {

            const fileReaderPos = fileReader.start + fileReader.bytesRead - fileReader.readableLength

            if (fileReaderPos !== entries[i].header.getOffsetOfLocalFileHeader()) {

                const start = entries[i].header.getOffsetOfLocalFileHeader()
                fileReader = this.file.createFdReadStream(start, end)
            }

            await entries[i]._extract(outputPath, fileReader, decoder)
            decoder.reset()
        }

        await this.file.close()
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
        const end = this.zip32Header.getCentralDirectoriesOffsetWithStartingDisk() + this.zip32Header.getSizeOfCentralDirectories() - 1

        const readStream = this.file.createReadStream(start, end)

        const promise = new Promise((resolve) => {

            const decoder = new CentralHeaderDecoder()
            const entries = []

            readStream.on('data', (chunk) => {

                while (chunk) {

                    chunk = decoder.update(chunk)

                    if (chunk) {

                        entries.push(new Entry(decoder.decode(), this.file))
                        decoder.reset()
                    }
                }
            })

            readStream.on('end', () => {

                resolve(entries)
            })
        })

        this.entries = await promise

        this.entries[0].header._buffer.forEach((obj) => console.log(obj))

        debugger

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

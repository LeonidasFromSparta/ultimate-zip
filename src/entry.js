import {createInflateRaw} from 'zlib'
import {PassThrough} from 'stream'
import {LOCAL_HEADER_LENGTH} from './constants'
import CRC32 from './crc32'
import {LOC_MAX} from './constants'
import DumpWriter from './dump-writer'
import CRC32Stream from './crc32-stream'
import {calculateLength, verifySignature} from './headers'
import {LOC_SIG} from './constants'
import {LOC_SPO} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'
import {LOC_HDR} from './constants'

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
        await this._inflater(fileReader, fileWriter)
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

    _inflater = async (reader, writer) => {

        const readerResume = () => reader.resume()
        const crc32Stream = new CRC32Stream(new CRC32())

        const promise = new Promise((resolve) => {

            const size = this.header.inflatedSize
            let bytesCounter = 0

            const callback = (chunk) => {

                const remainingBytes = size - bytesCounter

                if (chunk.length < remainingBytes) {

                    if (!inflater.write(chunk, 'buffer'))
                        reader.pause()

                    bytesCounter += chunk.length
                    return
                }

                inflater.end(chunk.slice(0, remainingBytes))

                reader.pause()
                reader.removeAllListeners()
                reader.unshift(chunk.slice(remainingBytes))
            }

            reader.on('data', callback)

            const inflater = this.header.isDeflated() ? createInflateRaw() : new PassThrough()
            inflater.pipe(crc32Stream).pipe(writer)
            inflater.on('drain', readerResume)

            writer.on('finish', resolve)

            readerResume()
        })

        await promise

        if (this.header.checksum !== crc32Stream.getValue())
            throw 'keke again'
    }

    _readLocalHeader = async (fileReader) => {

        await new Promise((resolve) => {

            let addedData = Buffer.alloc(0)
            const fieldArray = [LOC_FLE, LOC_ELE]

            fileReader.on('data', (chunk) => {

                addedData = Buffer.concat([addedData, chunk], addedData.length + chunk.length)

                while (addedData.length >= LOC_HDR) {

                    const length = calculateLength(addedData, fieldArray, LOC_HDR)

                    if (addedData.length < length)
                        return

                    const signature = addedData.readUInt32LE(0)
                    verifySignature(signature, LOC_SIG, 'loc dir sig err')

                    fileReader.pause()
                    fileReader.removeAllListeners()
                    fileReader.unshift(addedData.slice(length))
                    resolve()
                    break
                }
            })

            fileReader.resume()
        })
    }
}

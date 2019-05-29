import {locate_EOCDR_offset, locate_CDR_offset, locate_LFH_offset} from './zip-utils'
import CentralHeader32 from './CentralHeader32'
import CentralFileHeader from './CentralFileHeader'
import fs from 'fs'
import CDStream from './cd-stream'
import LFH from './LocalFileHeader'
import File from './file'

export default class Zip {

    constructor(path) {

        this.file = new File(path)

        const lastBytesBuf = this.file.readLastBytes(CentralHeader32.HEADER_FIXED_LENGTH + CentralHeader32.MAX_ZIP_COMMENT_LENGTH)
        const eocdr32Offset = CentralHeader32.locateHeaderStartPos(lastBytesBuf)
        this.eocdr32 = new CentralHeader32(lastBytesBuf.slice(eocdr32Offset))

        this.readCentralFileHeadersSync()
    }

    readCentralFileHeadersSync() {

        this.file.openFile()
        const buffer = this.file.readBytesSync(this.eocdr32.offsetOfCDWithStartingDiskNum, this.eocdr32.lengthOfCD)
        this.file.closeFile()

        this.centralFileHeaders = []
        let totalBytesRead = 0

        for (let i = 0; i < this.eocdr32.entriesInCD; i++) {

            const cdh = new CentralFileHeader(buffer.slice(totalBytesRead))
            this.centralFileHeaders.push(cdh)
            totalBytesRead += cdh.totalHeaderLength
        }

        console.log(this.centralFileHeaders[0].toString())
        console.log(this.centralFileHeaders[1].toString())
    }

    readLocalFileHeadersSync() {

        this.file.openFile()
        const buffer = this.file.readBytesSync(this.eocdr32.offsetOfCDWithStartingDiskNum, this.eocdr32.lengthOfCD)

        this.centralFileHeaders = []
        let totalBytesRead = 0

        for (let i = 0; i < this.eocdr32.entriesInCD; i++) {

            const cdh = new CentralFileHeader(buffer.slice(totalBytesRead))
            this.centralFileHeaders.push(cdh)
            totalBytesRead += cdh.totalHeaderLength
        }

        console.log(this.centralFileHeaders[0].toString())
        console.log(this.centralFileHeaders[1].toString())

        this.file.closeFile()
    }

    async getInfo2() {

        const lastBytesBuf = this.file.readLastBytes(CentralHeader32.HEADER_FIXED_LENGTH + CentralHeader32.MAX_ZIP_COMMENT_LENGTH)
        const eocdr32Offset = CentralHeader32.locateHeaderStartPos(lastBytesBuf)
        const eocdr32 = new CentralHeader32(lastBytesBuf.slice(eocdr32Offset))

        const prom = new Promise((resolve, reject) => {

            const stream = fs.createReadStream(this.file.path, {start: eocdr32.offsetOfCDWithStartingDiskNum})
            const cdStream = new CDStream(eocdr32.entriesInCD)

            stream.pipe(cdStream)
            stream.on('end', () => resolve(cdStream.CDRS))
        })

        const cdhs = await prom
        this.file.openFile()

        for (const cd of cdhs) {

            const buff = this.file.readBytes(cd.relativeOffsetOfLocalHeader, LFH.HEADER_FIXED_LENGTH + LFH.HEADER_MAX_VARIABLE_LENGTH)


            debugger

            console.log(new LFH(buff).toString())
        }


    }
}

//         // const readable = this.file.createReadStream(eocdr32.offsetOfCDWithStartingDiskNum, eocdr32.lengthOfCD)

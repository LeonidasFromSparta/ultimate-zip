import {locate_EOCDR_offset, locate_CDR_offset, locate_LFH_offset} from './zip-utils'
import EOCDR32 from './EOCDR32'
import CDH from './CDH'
import fs from 'fs'
import CDStream from './cd-stream'
import LFH from './LFH'
import File from './file'

export default class Zip {

    constructor(path) {

        this.file = new File(path)

/*

        console.log(this.eocdr32.toString())

        debugger



        debugger

        const lfhOffset = locate_LFH_offset(eocdBuffer)

        const lfh = new LFH(eocdBuffer.slice(87))
        console.log(lfh.toString())
*/
    }

    async getInfo() {

        const lastBytesBuf = this.file.readLastBytes(EOCDR32.HEADER_FIXED_LENGTH + EOCDR32.MAX_ZIP_COMMENT_LENGTH)
        const eocdr32Offset = EOCDR32.locateHeaderStartPos(lastBytesBuf)
        const eocdr32 = new EOCDR32(lastBytesBuf.slice(eocdr32Offset))

        const prom = new Promise((resolve, reject) => {

            const stream = fs.createReadStream(this.file.path, {start: eocdr32.offsetOfCDWithStartingDiskNum})
            const cdStream = new CDStream(eocdr32.entriesInCD)

            stream.pipe(cdStream)
            stream.on('end', () => resolve(cdStream.CDRS))
        })

        return await prom
    }

    async getInfo2() {

        const lastBytesBuf = this.file.readLastBytes(EOCDR32.HEADER_FIXED_LENGTH + EOCDR32.MAX_ZIP_COMMENT_LENGTH)
        const eocdr32Offset = EOCDR32.locateHeaderStartPos(lastBytesBuf)
        const eocdr32 = new EOCDR32(lastBytesBuf.slice(eocdr32Offset))

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

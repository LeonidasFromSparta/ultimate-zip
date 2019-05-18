import {locate_EOCDR_offset, locate_CDR_offset} from './zip-utils'
import {getBytesFromEndOfFile, getFileSize} from './file-utils'
import EOCDR32 from './EOCDR32'
import CDH from './CDH'
import fs from 'fs'
import CDStream from './cd-stream'

export default class Zip {

    constructor(path) {

        const fileSize = getFileSize(path)


        console.log(fileSize)

        const eocdBuffer = this.read_EOCD_buffer(path)

        const eocdr32Offset = locate_EOCDR_offset(eocdBuffer)

        const eocdr32 = new EOCDR32(eocdBuffer.slice(eocdr32Offset))

        console.log(eocdr32.toString() + '\n\n\n\n')

        const cdStream = new CDStream(eocdr32.entriesInCD)
        fs.createReadStream(path, {start: eocdr32.offsetOfCDWithStartingDiskNum, highWaterMark: 20}).pipe(cdStream)

        /*
        const cdrOffset = locate_CDR_offset(eocdBuffer)

        const cdr = new CDH(eocdBuffer.slice(cdrOffset))

        console.log(cdr.toString())
        */

        debugger
    }

    read_EOCD_buffer(path) {

        const bufferSize = 65536 + EOCDR32.HEADER_FIXED_LENGTH
        const buffer = getBytesFromEndOfFile(path, bufferSize)

        return buffer
    }
}

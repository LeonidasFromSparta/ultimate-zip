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

        const lastBytesBuf = this.file.readLastBytes(EOCDR32.HEADER_FIXED_LENGTH + EOCDR32.MAX_FILE_COMMENT_LENGTH)
        const eocdr32Offset = EOCDR32.locateHeaderStartPos(lastBytesBuf)

        this.eocdr32 = new EOCDR32(lastBytesBuf.slice(eocdr32Offset))

        console.log(this.eocdr32.toString())

        debugger

        const cdStream = new CDStream(this.eocdr32.entriesInCD)
        const readable = this.file.createReadStream(this.eocdr32.offsetOfCDWithStartingDiskNum, this.eocdr32.lengthOfCD)
        fs.createReadStream(path, {start: this.eocdr32.offsetOfCDWithStartingDiskNum}).pipe(cdStream)
        console.log(cdStream.CDRS)

        /*
        const cdrOffset = locate_CDR_offset(eocdBuffer)

        const cdr = new CDH(eocdBuffer.slice(cdrOffset))

        console.log(cdr.toString())

        debugger

        const lfhOffset = locate_LFH_offset(eocdBuffer)

        const lfh = new LFH(eocdBuffer.slice(87))
        console.log(lfh.toString())
        */
    }
}

import {locate_EOCDR_offset, locate_CDR_offset} from './zip-utils'
import {getBytesFromEndOfFile} from './file-utils'
import EOCDR32 from './EOCDR32'
import CDH from './CDH'

export default class Zip {

    constructor(path) {

        const eocdBuffer = this.read_EOCD_buffer(path)
        const eocdr32Offset = locate_EOCDR_offset(eocdBuffer)

        this.EOCDR32 = new EOCDR32(eocdBuffer.slice(eocdr32Offset))


        debugger

        const cdrOffset = locate_CDR_offset(eocdBuffer)

        this.CDR = new CDH(eocdBuffer.slice(cdrOffset))

        debugger
    }

    read_EOCD_buffer(path) {

        const bufferSize = 65536 + EOCDR32.BYTES_LENGTH
        const buffer = getBytesFromEndOfFile(path, bufferSize)

        return buffer
    }
}

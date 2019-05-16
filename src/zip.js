import {locate_EOCDR_offset} from './zip-utils'
import {getBytesFromEndOfFile} from './file-utils'
import EOCDR32 from './EOCDR32'
import EOCDR64 from './EOCDR64'
import EOCDR64L from './EOCDR64L'

export default class Zip {

    constructor(path) {

        const eocdBuffer = this.read_EOCD_buffer(path)
        const eocdr32Offset = locate_EOCDR_offset(eocdBuffer)

        this.EOCDR32 = new EOCDR32(eocdBuffer.slice(eocdr32Offset))


        debugger

        // check locator and zip64
        this.EOCDR64L = new EOCDR64L(eocdBuffer.slice(eocdr32Offset - EOCDR64L.BYTES_LENGTH, eocdr32Offset))

        

        console.log('oh hoh it is a 64!')



    }

    read_EOCD_buffer(path) {

        const bufferSize = 65536 + EOCDR32.BYTES_LENGTH + EOCDR64L.BYTES_LENGTH + EOCDR64.HEADER_LENGTH
        const buffer = getBytesFromEndOfFile(path, bufferSize)

        return buffer
    }
}

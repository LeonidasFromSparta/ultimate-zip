import {locate_EOCDR_offset} from './zip-utils'

export default class EOCDR64L {

    static BYTES_LENGTH = 20
    static SIGNATURE = 0x07064b50

    constructor(buffer) {

        this.verifySignature(buffer)
    }

    verifySignature(buffer) {

        if (EOCDR64L.SIGNATURE !== buffer.readUInt32LE(0))
            console.log('kekekeke1!!!')
    }
}

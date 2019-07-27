import Zip64Header from './zip64-header'
import {E64_SIG} from './constants'
import {E64_SPO} from './constants'
import {E64_CDN} from './constants'
import {E64_CDS} from './constants'
import {E64_OFF} from './constants'

export default class Zip64HeaderDecoder {

    decode = (data) => {

        const signature = data.readUInt32LE(E64_SPO)

        if (signature !== E64_SIG) {

            const actualSignature = '0x' + signature.toString(16).padStart(8, '0')
            const expectedSignature = '0x' + E64_SIG.toString(16).padStart(8, '0')

            throw (`Zip64 end of central directory record signature could not be confirmed: actual ${actualSignature} expected ${expectedSignature}`)
        }

        const header = new Zip64Header()
        header.setCentralDirectoriesNumber(parseInt(this._buffer.readBigUInt64LE(E64_CDN)))
        header.setCentralDirectoriesSize(parseInt(this._buffer.readBigUInt64LE(E64_CDS)))
        header.setCentralDirectoriesOffset(parseInt(this._buffer.readBigUInt64LE(E64_OFF)))
        return header
    }
}

import Zip64Header from './zip64-header'
import {E64_SIG} from './constants'
import {E64_SPO} from './constants'
import {E64_SIZ} from './constants'
import {E64_VEM} from './constants'
import {E64_PLM} from './constants'
import {E64_VER} from './constants'
import {E64_PLT} from './constants'
import {E64_DSK} from './constants'
import {E64_DCD} from './constants'
import {E64_CDD} from './constants'
import {E64_CDN} from './constants'
import {E64_CDS} from './constants'
import {E64_OFF} from './constants'
import {E64_HDR} from './constants'

export default class Zip64HeaderDecoder {

    update = (chunk) => {

        const signature = chunk.readUInt32LE(E64_SPO)

        this._buffer = chunk

        if (chunk.readUInt32LE(E64_SPO) !== E64_SIG)
            return false

        this._buffer = chunk
        return true
    }

    decode = () => {

        const signature = this._buffer.readUInt32LE(E64_SPO)

        if (signature !== E64_SIG) {

            const actualSignature = '0x' + signature.toString(16).padStart(8, '0')
            const expectedSignature = '0x' + E64_SIG.toString(16).padStart(8, '0')

            /*
            throw {
                name: 'Zip64 end of central directory record signature error',
                message: `Zip64 end of central directory record signature could not be confirmed: actual ${actualSignature} expected ${expectedSignature}`
            }
            */

            throw (`Zip64 end of central directory record signature could not be confirmed: actual ${actualSignature} expected ${expectedSignature}`)
        }

        const header = new Zip64Header()
        header.setCentralDirectoriesNumber(parseInt(this._buffer.readBigUInt64LE(E64_CDN)))
        header.setCentralDirectoriesSize(parseInt(this._buffer.readBigUInt64LE(E64_CDS)))
        header.setCentralDirectoriesOffsetWithStartingDisk(parseInt(this._buffer.readBigUInt64LE(E64_OFF)))
        return header
    }
}

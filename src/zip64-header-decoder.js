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

        this._buffer = chunk
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

        header.setPartialHeaderSize(parseInt(this._buffer.readBigUInt64LE(E64_SIZ)))
        header.setVersionMadeBy(this._buffer.readUInt8(E64_VEM))
        header.setPlatformCompatibility(this._buffer.readUInt8(E64_PLM))
        header.setVersionNeededToExtract(this._buffer.readUInt8(E64_VER))
        header.setPlatformNeededToExtract(this._buffer.readUInt8(E64_PLT))
        header.setDiskNumber(this._buffer.readUInt32LE(E64_DSK))
        header.setDiskNumberWithCentralDirectoriesStart(this._buffer.readUInt32LE(E64_DCD))
        header.setCentralDirectoriesNumberOnDisk(parseInt(this._buffer.readBigUInt64LE(E64_CDD)))
        header.setCentralDirectoriesNumber(parseInt(this._buffer.readBigUInt64LE(E64_CDN)))
        header.setCentralDirectoriesSize(parseInt(this._buffer.readBigUInt64LE(E64_CDS)))
        header.setCentralDirectoriesOffsetWithStartingDisk(parseInt(this._buffer.readBigUInt64LE(E64_OFF)))

        const extDataLen = header.getPartialHeaderSize() - E64_HDR + 12

        const extDataBuffer = Buffer.allocUnsafe(extDataLen)
        this._buffer.copy(extDataBuffer, 0, E64_HDR, E64_HDR + extDataLen)
        header.setHeaderLength(extDataBuffer)

        return header
    }
}

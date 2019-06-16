import Zip32Header from './zip-32-header'
import {END_SIG} from './constants'
import {END_SPO} from './constants'
import {END_DNU} from './constants'
import {END_DCS} from './constants'
import {END_CND} from './constants'
import {END_CDC} from './constants'
import {END_CDS} from './constants'
import {END_OFF} from './constants'
import {END_ZCL} from './constants'
import {END_HDR} from './constants'
import {END_MAX} from './constants'

export default class Zip32HeaderDecoder {

    _buffer = Buffer.alloc(END_MAX)

    update = (chunk) => {

        let offset = -1

        for (let i = chunk.length - (END_HDR - 4); i !== -1; i--)
            if (chunk.readUInt32LE(i) === END_SIG)
                offset = i

        if (offset !== -1) {

            this._buffer = chunk.slice(offset)
            return chunk.slice(0, offset)
        }

        const signature = '0x' + END_SIG.toString(16).padStart(8, '0')

        throw new ({
            name: 'End of central directory record signature error',
            message: `End of central directory record signature ${signature} could not be located`
        })
    }

    decode = () => {

        const header = new Zip32Header()

        header.setSignature(this._buffer.readUInt32LE(END_SPO))
        header.setDiskNumber(this._buffer.readUInt16LE(END_DNU))
        header.setDiskNumberWhereCentralDirectoriesStart(this._buffer.readUInt16LE(END_DCS))
        header.setCentralDirectoriesNumberOnDisk(this._buffer.readUInt16LE(END_CND))
        header.setCentralDirectoriesNumber(this._buffer.readUInt16LE(END_CDC))
        header.setCentralDirectoriesSize(this._buffer.readUInt32LE(END_CDS))
        header.setCentralDirectoriesOffsetWithStartingDisk(this._buffer.readUInt32LE(END_OFF))

        const commentLen = this._buffer.readUInt16LE(END_ZCL)
        header.setZipFileComment(this._buffer.toString('utf8', END_HDR, END_HDR + commentLen))

        header.setHeaderLength(END_HDR + commentLen)

        const signature = header.getSignature()

        if (signature !== END_SIG) {

            const actualSignature = '0x' + signature.toString(16).padStart(8, '0')
            const expectedSignature = '0x' + END_SIG.toString(16).padStart(8, '0')

            /*
            throw {
                name: 'End header signature error',
                message: `End header signature could not be confirmed: expected ${expectedSignature}, actual ${actualSignature}`
            }
            */

           throw (`End of central directory record signature could not be confirmed: actual ${actualSignature} expected ${expectedSignature}`)
        }

        return header
    }
}

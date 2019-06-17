import Zip32Header from './zip-32-header'
import {END_SIG} from './constants'
import {END_DNU} from './constants'
import {END_DCS} from './constants'
import {END_CND} from './constants'
import {END_CDC} from './constants'
import {END_CDS} from './constants'
import {END_OFF} from './constants'
import {END_ZCL} from './constants'
import {END_HDR} from './constants'

export default class Zip32HeaderDecoder {

    update = (chunk) => {

        let offset = chunk.length - (END_HDR - 4)

        for (; offset !== -1; offset--)
            if (chunk.readUInt32LE(offset) === END_SIG)
                break

        if (offset === -1) {

            const signature = '0x' + END_SIG.toString(16).padStart(8, '0')

            throw new ({
                name: 'End of central directory record signature error',
                message: `End of central directory record signature ${signature} could not be located`
            })
        }

        this._buffer = chunk.slice(offset)
    }

    decode = () => {

        const header = new Zip32Header()

        header.setDiskNumber(this._buffer.readUInt16LE(END_DNU))
        header.setDiskNumberWhereCentralDirectoriesStart(this._buffer.readUInt16LE(END_DCS))
        header.setCentralDirectoriesNumberOnDisk(this._buffer.readUInt16LE(END_CND))
        header.setCentralDirectoriesNumber(this._buffer.readUInt16LE(END_CDC))
        header.setCentralDirectoriesSize(this._buffer.readUInt32LE(END_CDS))
        header.setCentralDirectoriesOffsetWithStartingDisk(this._buffer.readUInt32LE(END_OFF))

        const commentLen = this._buffer.readUInt16LE(END_ZCL)
        header.setZipFileComment(this._buffer.toString('utf8', END_HDR, END_HDR + commentLen))

        header.setHeaderLength(END_HDR + commentLen)

        return header
    }
}

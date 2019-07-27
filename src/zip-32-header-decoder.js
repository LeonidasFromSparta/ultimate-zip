import Zip32Header from './zip-32-header'
import {END_SIG} from './constants'
import {END_CDC} from './constants'
import {END_OFF} from './constants'
import {END_ZCL} from './constants'
import {END_CDS} from './constants'
import {END_HDR} from './constants'

export default class Zip32HeaderDecoder {

    decode = (data, size) => {

        const offset = this._findOffset(data)
        const headerData = data.slice(offset)

        const header = new Zip32Header()
        header.setCentralDirectoriesNumber(headerData.readUInt16LE(END_CDC))
        header.setCentralDirectoriesSize(headerData.readUInt32LE(END_CDS))
        header.setCentralDirectoriesOffset(headerData.readUInt32LE(END_OFF))
        header.setHeaderOffset(size - offset)

        const commentLen = headerData.readUInt16LE(END_ZCL)
        header.setHeaderLength(END_HDR + commentLen)

        return header
    }

    _findOffset = (data) => {

        for (let offset = data.length - (END_HDR - 4); offset !== -1; offset--)
            if (data.readUInt32LE(offset) === END_SIG)
                return offset

        throw (`Zip32 end of central directory record signature could not be found`)
    }
}

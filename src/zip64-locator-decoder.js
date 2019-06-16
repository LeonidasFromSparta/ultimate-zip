import Zip64Locator from './zip64-locator'
import {ELO_SIG} from './constants'
import {ELO_SPO} from './constants'
import {ELO_DCS} from './constants'
import {ELO_OFF} from './constants'
import {ELO_TDN} from './constants'
import {ELO_HDR} from './constants'

export default class Zip64LocatorDecoder {

    update = (chunk) => {

        this._buffer = chunk.slice(chunk.length - ELO_HDR)

        if (this._buffer.readUInt32LE(ELO_SPO) !== ELO_SIG)
            return null

        return chunk.slice(0, chunk.length - ELO_HDR)
    }

    decode = () => {

        const locator = new Zip64Locator()

        locator.setSignature(this._buffer.readUInt32LE(ELO_SPO))
        locator.setDiskNumberWhereZip64HeaderStarts(this._buffer.readUInt32LE(ELO_DCS))
        locator.setOffsetZip64Header(this._buffer.readUInt16LE(ELO_OFF))
        locator.setTotalDisksNumber(this._buffer.readUInt16LE(ELO_TDN))
        locator.setHeaderLength(ELO_HDR)

        return locator
    }
}

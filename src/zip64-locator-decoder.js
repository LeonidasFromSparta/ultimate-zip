import Zip64Locator from './zip64-locator'
import {ELO_SIG} from './constants'
import {ELO_SPO} from './constants'
import {ELO_OFF} from './constants'

export default class Zip64LocatorDecoder {

    update = (chunk) => {

        if (chunk.readUInt32LE(ELO_SPO) !== ELO_SIG)
            return false

        this._buffer = chunk
        return true
    }

    decode = () => {

        const locator = new Zip64Locator()
        locator.setOffsetZip64Header(parseInt(this._buffer.readBigUInt64LE(ELO_OFF)))
        return locator
    }
}

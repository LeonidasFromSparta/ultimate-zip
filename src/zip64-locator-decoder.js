import Zip64Locator from './zip64-locator'
import {ELO_SIG} from './constants'
import {ELO_SPO} from './constants'
import {ELO_OFF} from './constants'

export default class Zip64LocatorDecoder {

    decode = (data) => {

        if (data.readUInt32LE(ELO_SPO) !== ELO_SIG)
            return undefined

        const locator = new Zip64Locator()
        locator.setOffsetZip64Header(parseInt(data.readBigUInt64LE(ELO_OFF)))
        return locator
    }
}

import {LOC_SIG} from './constants'
import {LOC_SPO} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'
import {LOC_HDR} from './constants'
import {capableOfCopying} from './funcz'

export default class LocalHeaderDecoder {

    _array = []
    _maxSize = LOC_HDR

    update = (data) =>  {

        let dataOff = 0

        while (capableOfCopying(this._array.length, this._maxSize, dataOff, data.length)) {

            this._array.push(data[dataOff++])

            switch (this._array.length - 1) {

                case LOC_SPO + 1:
                    this._maxSize += 0
                    break

                case LOC_FLE + 1:
                    this._maxSize += (this._array[LOC_FLE] | this._array[LOC_FLE + 1] << 8)
                    break

                case LOC_ELE + 1:
                    this._maxSize += (this._array[LOC_ELE] | this._array[LOC_ELE + 1] << 8)
                    break
            }
        }

        return data.slice(dataOff)
    }
}

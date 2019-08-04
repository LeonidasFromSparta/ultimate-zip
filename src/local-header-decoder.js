import {LOC_SIG} from './constants'
import {LOC_SPO} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'

import {capableOfCopying} from './headers'

export const update = (data, headerData) =>  {

    let dataOff = 0

    while (capableOfCopying(headerData.array.length, headerData.maxSize, dataOff, data.length)) {

        headerData.array.push(data[dataOff++])

        switch (headerData.array.length - 1) {

            case LOC_SPO + 1:
                headerData.maxSize += 0
                break

            case LOC_FLE + 1:
                headerData.maxSize += (headerData.array[LOC_FLE] | headerData.array[LOC_FLE + 1] << 8)
                break

            case LOC_ELE + 1:
                headerData.maxSize += (headerData.array[LOC_ELE] | headerData.array[LOC_ELE + 1] << 8)
                break
        }
    }

    return data.slice(dataOff)
}

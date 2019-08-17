import {cenDecoder} from './decoders'
import {CEN_HDR} from './constants'
import {CEN_SIG} from './constants'
import {CEN_INCONSTANT_OFFSET} from './constants'
import {locDecoder} from './decoders'

const verifySignature = (expected, observed, message) => {

    if (expected !== observed)
        throw (message)
}

const calculateHeaderLength = (data, fields, intial) => fields.reduce((acc, pos) => acc + data.readUInt16LE(pos), intial)

const readCenHeaders = (buffer) => {

    console.log('buff ' + buffer.length)

    const headers = []
    let i = 1

    while (CEN_HDR < buffer.length) {

        console.log('reading header ' + i++)

        const length = calculateHeaderLength(buffer, CEN_INCONSTANT_OFFSET, CEN_HDR)

        console.log('header length ' + length)

        const signature = buffer.readUInt32LE(0)
        verifySignature(signature, CEN_SIG, 'cen dir sig err')

        const headerBuffer = buffer.slice(0, length)
        const header = cenDecoder(headerBuffer, 0)
        headers.push(header)

        buffer = buffer.slice(length)
    }

    return headers
}

const readLocHeader = (buffer) => {

    return locDecoder(buffer, 0)
}

export {verifySignature, calculateHeaderLength, readCenHeaders, readLocHeader}

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

    const headers = []

    while (CEN_HDR < buffer.length) {

        const length = calculateHeaderLength(buffer, CEN_INCONSTANT_OFFSET, CEN_HDR)

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

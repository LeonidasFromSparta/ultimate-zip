import {END_HDR} from './constants'
import {END_SIG} from './constants'
import {cenDecoder} from './decoders'
import {CEN_HDR} from './constants'
import {CEN_SIG} from './constants'
import {CEN_INCONSTANT_OFFSET} from './constants'
import {locDecoder} from './decoders'

const verifySignature = (expected, observed, message) => {

    if (expected !== observed)
        throw (message)
}

const findZip32Offset = (buffer) => {

    for (let offset = buffer.length - (END_HDR - 4); offset !== -1; offset--)
        if (buffer.readUInt32LE(offset) === END_SIG)
            return offset

    throw (`Zip32 end of central directory record signature could not be found`)
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

export {verifySignature, findZip32Offset, calculateHeaderLength, readCenHeaders, readLocHeader}

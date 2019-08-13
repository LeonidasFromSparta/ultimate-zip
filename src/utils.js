import {END_HDR} from './constants'
import {END_SIG} from './constants'

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

export {verifySignature, findZip32Offset, calculateHeaderLength}

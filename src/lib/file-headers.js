import {cenDecoder} from './../decoders'
import {CEN_HDR} from './../constants'
import {CEN_SIG} from './../constants'
import {locDecoder} from './../decoders'
import {LOC_HDR} from './../constants'
import {calculateHeaderLength, verifySignature} from './../utils'
import {CEN_INCONSTANT_OFFSET} from './../constants'

const readCenHeaders = async (start, length, file) => {

    await file.open()

    let buffer = await file.read(start, length)
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

    await file.close()

    return headers
}

const readLocHeader = async (start, file) => {

    const hdrBuff = await file.read(start, LOC_HDR)
    return locDecoder(hdrBuff, 0)
}

export {readCenHeaders, readLocHeader}

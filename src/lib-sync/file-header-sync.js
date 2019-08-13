import {cenDecoder} from './../decoders'
import {CEN_HDR} from './../constants'
import {CEN_SIG} from './../constants'
import {locDecoder} from './../decoders'
import {LOC_HDR} from './../constants'
import {calculateHeaderLength, verifySignature} from './../utils'
import {CEN_INCONSTANT_OFFSET} from './../constants'

const readCenHeadersSync = (start, length, file) => {

    file.openSync()

    let buffer = file.readSync(start, length)
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

    file.closeSync()

    return headers
}

const readLocHeaderSync = (start, file) => {

    const hdrBuff = file.readSync(start, LOC_HDR)
    return locDecoder(hdrBuff, 0)
}

export {readCenHeadersSync, readLocHeaderSync}

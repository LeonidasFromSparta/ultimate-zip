import Zip64Locator from './zip-32-header'


/*
export const ELO_SIG = 0x07064B50
export const ELO_SPO = 0
export const ELO_DCS = 4
export const ELO_OFF = 8
export const ELO_TDN = 16
export const ELO_HDR = 20
*/

export default class Zip64LocatorDecoder {

    update = (chunk) => {

        this._buffer = chunk.slice(chunk.length - ELO_HDR)

        if (this._buffer.readUInt32LE(ELO_SPO) !== ELO_SIG)
            return null

        return chunk.slice(0, chunk.length - ELO_HDR)
    }

    decode = () => {

        const header = new Zip64Locator()

        header.setSignature(this._buffer.readUInt32LE(END_SPO))
        header.setDiskNumber(this._buffer.readUInt16LE(END_DNU))
        header.setDiskNumberWhereCentralDirectoriesStart(this._buffer.readUInt16LE(END_DCS))
        header.setCentralDirectoriesNumberOnDisk(this._buffer.readUInt16LE(END_CND))
        header.setCentralDirectoriesNumber(this._buffer.readUInt16LE(END_CDC))
        header.setCentralDirectoriesSize(this._buffer.readUInt32LE(END_CDS))
        header.setCentralDirectoriesOffsetWithStartingDisk(this._buffer.readUInt32LE(END_OFF))

        const commentLen = this._buffer.readUInt16LE(END_ZCL)
        header.setZipFileComment(this._buffer.toString('utf8', END_HDR, END_HDR + commentLen))

        header.setHeaderLength(END_HDR + commentLen)

        const signature = header.getSignature()

        if (signature !== END_SIG) {

            const actualSignature = '0x' + signature.toString(16).padStart(8, '0')
            const expectedSignature = '0x' + END_SIG.toString(16).padStart(8, '0')

            /*
            throw {
                name: 'End header signature error',
                message: `End header signature could not be confirmed: expected ${expectedSignature}, actual ${actualSignature}`
            }
            */

           throw (`End of central directory record signature could not be confirmed: actual ${actualSignature} expected ${expectedSignature}`)
        }

        return header
    }
}

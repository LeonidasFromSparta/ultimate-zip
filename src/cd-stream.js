import {Writable} from 'stream'
import CDH from './CDH'

export default class CDStream extends Writable {

    tmpCDR = null
    CDRS = []
    fixedLengthBuf = null
    fixedLengthBufIndex = 0

    variableLengthBuf = null
    variableLengthBufIndex = 0

    constructor(totalCDEntries) {

        super()
        totalCDEntries = totalCDEntries
    }

    _write(chunk, encoding, callback) {

        for (let i = 0; i < chunk.length; i++) {

            if (this.fixedLengthBuf === null)
                this.fixedLengthBuf = new Buffer.allocUnsafe(CDH.HEADER_FIXED_LENGTH)

            if (this.fixedLengthBufIndex < this.fixedLengthBuf.length) {

                this.fixedLengthBuf[this.fixedLengthBufIndex] = chunk[i]
                this.fixedLengthBufIndex++
                continue
            }

            if (this.fixedLengthBufIndex === this.fixedLengthBuf.length) {

                this.tmpCDR = new CDH(this.fixedLengthBuf)
                this.variableLengthBuf = new Buffer.allocUnsafe(this.tmpCDR.variableHeaderLength)
                this.fixedLengthBufIndex++
            }

            if (this.variableLengthBufIndex < this.variableLengthBuf.length) {

                this.variableLengthBuf[this.variableLengthBufIndex] = chunk[i]
                this.variableLengthBufIndex++
            }

            if (this.variableLengthBufIndex === this.variableLengthBuf.length) {

                this.tmpCDR.readVariableData(this.variableLengthBuf)
                this.CDRS.push(this.tmpCDR)

                if (this.CDRS.length === this.totalCDEntries)
                    this.end()

                this.tmpCDR = null

                this.fixedLengthBuf = null
                this.fixedLengthBufIndex = 0

                this.variableLengthBuf = null
                this.variableLengthBufIndex = 0
            }
        }

        callback()
    }
}

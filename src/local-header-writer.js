import {Writable} from 'stream'
import LocalHeaderSerializer from './local-header-decoder'

export default class LocalHeaderWriteable extends Writable {

    constructor(readStream, centralHeader, decoder) {

        super({emitClose: false, autoDestroy: true})

        this.readStream = readStream
        this.centralHeader = centralHeader
        this.decoder = decoder
    }

    _write = (chunk, encoding, callback) => {

        let bytesRead = 0

        while (bytesRead < chunk.length) {

            const fixRead = this.decoder.updateFixed(chunk.slice(bytesRead))
            bytesRead += fixRead.bytes

            if (!fixRead.done)
                continue

            const varRead = this.decoder.updateVar(chunk.slice(bytesRead))
            bytesRead += varRead.bytes

            if (varRead.done) {

                this.readStream.pause()
                this.readStream.unshift(chunk.slice(bytesRead))

                this.header = this.decoder.decode()
                this.end()
                break
            }
        }

        callback()
    }

    _final = (callback) => {

        callback()
    }
}

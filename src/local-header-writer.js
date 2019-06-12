import {Writable} from 'stream'

export default class LocalHeaderWriteable extends Writable {

    constructor(readStream, centralHeader, decoder) {

        super({emitClose: false, autoDestroy: true})

        this.readStream = readStream
        this.centralHeader = centralHeader
        this.decoder = decoder
    }

    _write = (chunk, encoding, callback) => {

        if (this.centralHeader.getFileName() === 'node_modules/@babel/core/node_modules/@babel/traverse/lib/scope/lib/')
            debugger

        const fixRead = this.decoder.updateFixed(chunk)

        if (!fixRead.done)
            return callback()

        const varRead = this.decoder.updateVar(chunk.slice(fixRead.bytes))

        if (!varRead.done)
            return callback()

        // callback()



        this.readStream.pause()
        this.readStream.unshift(chunk.slice(fixRead.bytes + varRead.bytes))


        this.end()
        // this.destroy()

        this.header = this.decoder.decode()

        callback()
    }

    _final = (callback) => {

        console.log('dumbale')
        callback()
    }
}

import {Transform} from 'stream'

export default class BytesCounterStream extends Transform {

    constructor(size) {

        super()

        this.size = size
        this.counter = 0
    }

    _transform(chunk, encoding, callback) {

        debugger

        if ((this.counter + chunk.length) < this.size) {

            console.log(chunk.toString())

            this.counter += chunk.length
            this.push(chunk)

        } else {

            const bytesRemaining = this.size - this.counter
            const remainingChunk = chunk.slice(0, bytesRemaining)

            console.log(remainingChunk.toString())

            this.push(remainingChunk)
            this.push(null)
        }

        callback()
    }
}

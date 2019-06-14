import {Transform} from 'stream'

export default class DataControlXform extends Transform {

    constructor(header) {

        super()
        this.size = header.getCompressedSize()
        this.counter = 0
    }

    _transform(chunk, encoding, callback) {

        const nextCounterSize = chunk.length + this.counter

        if (nextCounterSize > this.size) {

            const bytesRemaining = this.size - this.counter
            const remainingChunk = chunk.slice(0, bytesRemaining)

            this.push(remainingChunk)
            this.push(null)
            return
        }

        if (nextCounterSize < this.size) {

            this.counter += chunk.length
            this.push(chunk)

            callback()
            return
        }

        this.push(chunk)
        this.push(null)
    }
}

import {Transform} from 'stream'

export default class DataControlXform extends Transform {

    constructor(readStream, size) {

        super()

        this.readStream = readStream
        this.size = size
        this.counter = 0
    }

    _transform(chunk, encoding, callback) {

        const nextCounterSize = chunk.length + this.counter

        if (nextCounterSize > this.size) {

            const bytesRemaining = this.size - this.counter
            const remainingChunk = chunk.slice(0, bytesRemaining)
            const unshiftedChunk = chunk.slice(bytesRemaining)

            this.push(remainingChunk)
            this.push(null)
            this.end()

            this.readStream.pause()
            this.readStream.unshift(unshiftedChunk)

            callback()
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
        this.end()

        this.readStream.pause()

        callback()
    }
}

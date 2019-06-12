import {Transform} from 'stream'

export default class DataControlXform extends Transform {

    constructor(streamReader, header) {

        super()

        this.streamReader = streamReader
        this.size = header.getCompressedSize()
        this.counter = 0

        this.header = header

        // if (this.header.getFileName() === 'node_modules/@babel/core/lib/tools/build-external-helpers.js')
        // debugger
    }

    _transform(chunk, encoding, callback) {

        // if (this.header.getFileName() === 'node_modules/@babel/core/lib/tools/build-external-helpers.js')
        //    debugger
        // console.log(this.header.getFileName() + ' wow')


        const nextCounterSize = chunk.length + this.counter

        try {

            if (nextCounterSize > this.size) {

                const bytesRemaining = this.size - this.counter
                const remainingChunk = chunk.slice(0, bytesRemaining)
                const unshiftedChunk = chunk.slice(bytesRemaining)

                this.push(remainingChunk)
                this.push(null)
                // this.end()

                // callback()

                this.streamReader.pause()
                this.streamReader.unshift(unshiftedChunk)

                return
            }
        } catch (ex) {

            debugger
        }

        try {

            if (nextCounterSize < this.size) {

                this.counter += chunk.length
                this.push(chunk)

                callback()
                return
            }

        } catch (ex) {

            debugger
        }

    try {


        this.push(chunk)
        this.push(null)
        // this.end()

        // callback()

        this.streamReader.pause()

    } catch (ex) {

        debugger
    }
    }
}

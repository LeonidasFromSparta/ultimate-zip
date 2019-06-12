import {Transform} from 'stream'
import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeaderWriteable extends Transform {

    deserializer = new LocalHeaderSerializer()
    header = null

    _transform = (chunk, encoding, callback) => {

        // time for deserializing
        let bytesRead = 0

        while (bytesRead < chunk.length) {

            // take care the header
            if (this.header === null) {

                const fixRead = this.deserializer.updateFixed(chunk.slice(bytesRead))
                bytesRead += fixRead.bytes

                if (!fixRead.done)
                    continue

                const varRead = this.deserializer.updateVar(chunk.slice(bytesRead))
                bytesRead += varRead.bytes

                if (varRead.done) {

                    this.header = this.deserializer.deserealize()
                    this.deserializer.reset()

                    this.max = this.header.getCompressedSize()
                    this.count = 0
                } else {

                    continue
                }
            }

            // start flowing the data
            if ((this.count + chunk.length - bytesRead) < this.max) {

                this.push(chunk.slice(bytesRead))
                this.count += (chunk.length - bytesRead)
            } else {

                const bytesRemaining = this.max - this.count
                this.push(chunk.slice(bytesRead, bytesRead + bytesRemaining))
                this.push(null)
                bytesRead += (this.max - this.count)
                this.header = null
            }
        }

        callback()
    }
}

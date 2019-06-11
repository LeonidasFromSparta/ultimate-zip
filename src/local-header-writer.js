import {Transform} from 'stream'
import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeaderWriteable extends Transform {

    deserializer = new LocalHeaderSerializer()
    header

    _transform = (chunk, encoding, callback) => {

        // time for deserializing
        if (this.header !== null)

        let bytesRead = 0

        while (bytesRead < chunk.length) {

            const fixRead = this.deserializer.updateFixed(chunk.slice(bytesRead))
            bytesRead += fixRead.bytes

            if (!fixRead.done)
                continue

            const varRead = this.deserializer.updateVar(chunk.slice(bytesRead))
            bytesRead += varRead.bytes

            if (varRead.done) {

                this.header = this.deserializer.deserealize()
                this.chunk = chunk.slice(bytesRead)

                debugger
                break
            }
        }

        callback()
    }
}

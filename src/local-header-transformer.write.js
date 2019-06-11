import {Writable} from 'stream'
import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeaderWriteable extends Writable {

    deserializer = new LocalHeaderSerializer()

    _write = (chunk, encoding, callback) => {

        debugger

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
                this.end()
                break
            }
        }

        callback()
    }
}

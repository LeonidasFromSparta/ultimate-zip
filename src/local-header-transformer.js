import {Transform} from 'stream'
import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeaderWriteable extends Transform {

    constructor() {

        super({objectMode: true})
        this.deserializer = new LocalHeaderSerializer()
    }

    _write = (chunk, encoding, callback) => {

        let bytesRead = 0

        while (bytesRead < chunk.length) {

            bytesRead += this.deserializer.update(chunk.slice(bytesRead))

            if (this.deserializer.isDone()) {

                this.push(this.deserializer.deserealize())
                this.deserializer.reset()
            }
        }

        callback()
    }
}

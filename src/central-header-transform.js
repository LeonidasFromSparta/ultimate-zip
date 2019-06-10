import {Transform} from 'stream'
import CentralHeaderSerializer from './central-header-serializer'

export default class CentralHeaderTransformer extends Transform {

    constructor() {

        super({objectMode: true})
        this.deserializer = new CentralHeaderSerializer()
    }

    _write = (chunk, encoding, callback) => {

        debugger

        let bytesRead = 0

        while (bytesRead < chunk.length) {

            bytesRead += this.deserializer.update(chunk.slice(bytesRead))

            if (this.deserializer.isDone()) {

                debugger

                this.push(this.deserializer.deserealize())
                this.deserializer.reset()
            }
        }

        callback()
    }
}

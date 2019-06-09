import {Transform} from 'stream'
import CentralHeaderSerializer from './central-header-serializer.new'

export default class CentralHeaderDuplex extends Transform {

    deserializer = new CentralHeaderSerializer()

    constructor() {

        super({objectMode: true})
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

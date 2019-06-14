import {Transform} from 'stream'
import CentralHeaderSerializer from './central-header-decoder'

export default class CentralHeaderTransformer extends Transform {

    constructor() {

        super({objectMode: true})
        this.deserializer = new CentralHeaderSerializer()
    }

    _write = (chunk, encoding, callback) => {

        let bytesRead = 0

        while (bytesRead < chunk.length) {

            const fixRead = this.deserializer.updateFixed(chunk.slice(bytesRead))
            bytesRead += fixRead.bytes

            if (!fixRead.done)
                continue

            const varRead = this.deserializer.updateVar(chunk.slice(bytesRead))
            bytesRead += varRead.bytes

            if (varRead.done) {

                this.push(this.deserializer.deserealize())
                this.deserializer.reset()
            }
        }

        callback()
    }
}

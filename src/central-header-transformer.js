import {Transform} from 'stream'
import CentralHeaderSerializer from './central-header-serializer'

export default class CentralHeaderTransformer extends Transform {

    constructor() {

        super({objectMode: true})
        this.deserializer = new CentralHeaderSerializer()
    }

    _write = (chunk, encoding, callback) => {

        let bytesRead = 0

        while (bytesRead < chunk.length) {

            const sliced = chunk.slice(bytesRead)

            const fixedRead = this.deserializer.updateFixed(sliced)
            bytesRead += fixedRead

            if (fixedRead !== 0)
                continue

            const varRead = this.deserializer.updateVar(sliced)
            bytesRead += varRead

            if (varRead === 0) {

                this.push(this.deserializer.deserealize())
                this.deserializer.reset()
            }
        }

        console.log('chekist')

        callback()
    }
}

import {Writable} from 'stream'
import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeaderWriteable extends Writable {

    constructor() {

        super()
        this.localHeaderDeserializer = new LocalHeaderSerializer()
    }

    _write(chunk, encoding, callback) {

        this.localHeaderDeserializer.update(chunk)

        if (this.localHeaderDeserializer.isDone())
            this.end()

        callback()
    }

    deserialize = () => {

        return this.localHeaderDeserializer.deserialize()
    }
}

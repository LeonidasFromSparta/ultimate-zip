import {Writable} from 'stream'
import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeaderWriteable extends Writable {

    deserializer = new LocalHeaderSerializer()

    _write = (chunk, encoding, callback) => {

        this.deserializer.update(chunk)

        if (this.deserializer.isDone())
            this.end()

        callback()
    }

    getHeader = () => {

        return this.deserializer.deserialize()
    }
}

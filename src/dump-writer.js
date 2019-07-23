import {Writable} from 'stream'

export default class DumpWriter extends Writable {

    _write = (chunk, encoding, callback) => {

        callback()
    }

    _writev = (chunks, callback) => {

        callback()
    }
}

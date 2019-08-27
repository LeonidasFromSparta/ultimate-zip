import {extractSync, testSync, getAsBufferSync} from './lib/zip-entry-sync'
import {extract, test, getAsBuffer, getAsStream} from './lib/zip-entry'
import File from './file'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = (path, callback) => {

        if (typeof callback !== 'function')
            return extract(path, this.header, this.file)

        extract(path, this.header, this.file)
        .then(() => callback(null))
        .catch((err) => callback(err))
    }

    getAsBuffer = (callback) => {

        const file = new File(this.file.path)

        if (typeof callback !== 'function')
            return getAsBuffer(this.header, file)

        getAsBuffer(this.header, file)
        .then((data) => callback(null, data))
        .catch((err) => callback(err, null))
    }

    getAsStream = (callback) => {

        const file = new File(this.file.path)

        if (typeof callback !== 'function')
            return getAsStream(this.header, file)

        getAsStream(this.header, file)
        .then((stream) => callback(null, stream))
        .catch((err) => callback(err, null))
    }

    test = (callback) => {

        if (typeof callback !== 'function')
            return test(this.header, this.file)

        test(this.header, this.file)
        .then(() => callback(null))
        .catch((err) => callback(err))
    }
}

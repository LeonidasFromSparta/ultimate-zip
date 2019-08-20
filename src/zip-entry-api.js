import {extractSync, testSync, getAsBufferSync} from './lib/zip-entry-sync'
import {extract, test, getAsBuffer, getAsStream} from './lib/zip-entry'
import File from './file'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = (path, callback) => {

        if (!callback || typeof callback !== 'function')
            return extract(path, this.header, this.file)

        extract(path, this.header, this.file)
        .then(callback)
        .catch((err) => callback(err))
    }

    getAsBuffer = (callback) => {

        const file = new File(this.file.path)

        if (!callback || typeof callback !== 'function')
            return getAsBuffer(this.header, file)

        getAsBuffer(this.header, file)
        .then((content) => callback(undefined, content))
        .catch((err) => callback(err))
    }

    getAsStream = (callback) => {

        const file = new File(this.file.path)

        if (!callback || typeof callback !== 'function')
            return getAsStream(this.header, file)

        getAsStream(this.header, file)
        .then((stream) => callback(undefined, stream))
        .catch((err) => callback(err))
    }

    test = (callback) => {

        if (!callback || typeof callback !== 'function')
            return test(this.header, this.file)

        test(this.header, this.file)
        .then((data) => callback(undefined, data))
        .catch((err) => callback(err))
    }

    extractSync = (path) => {

        extractSync(path, this.header, this.file)
    }

    getAsBufferSync = () => {

        return getAsBufferSync(this.header, this.file)
    }

    testSync = () => {

        testSync(this.header, this.file)
    }
}

import {extractSync, testSync, getAsBufferSync} from './lib-sync/zip-entry-sync'
import {extract, test, getAsBuffer} from './lib/zip-entry'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = (path, callback) => {

        if (callback)
            return extract(path, this.header, this.file).then(callback).catch((err) => callback(err))

        return extract(path, this.header, this.file)
    }

    getAsBuffer = (callback) => {

        if (callback)
            return getAsBuffer(this.header, this.file).then((data) => callback(undefined, data)).catch((err) => callback(err))

        return getAsBuffer(this.header, this.file)
    }

    getAsStream = async () => {

        // TO DO
        // return await getAsBuffer(this.header, this.file)
    }

    test = async () => {

        await test(this.header, this.file)
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

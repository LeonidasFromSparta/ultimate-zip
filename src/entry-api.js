import {extractSync, testSync, getAsBufferSync} from './entry-sync'
import {extract, test, getAsBuffer} from './entry'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = async (path) => {

        await extract(path, this.header, this.file)
    }

    getAsBuffer = async () => {

        return await getAsBuffer(this.header, this.file)
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

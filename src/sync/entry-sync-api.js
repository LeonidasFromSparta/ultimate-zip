import {extractSync, testSync, getAsBufferSync} from './entry-sync'
import File from './../lib/file'

export default class EntrySync {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extractSync = (path) => {

        extractSync(path, this.header, this.file)
    }

    getAsBufferSync = () => {

        const file = new File(this.file.path)
        return getAsBufferSync(this.header, file)
    }

    testSync = () => {

        testSync(this.header, this.file)
    }
}

import {sync} from './../lib/fs-compat'
import {extractSync, testSync, getAsBufferSync} from './methods'

export default class EntrySyncApi {

    constructor(header, path) {

        this.header = header
        this.path = path
    }

    testSync = () => {

        const fd = sync.openSync(this.path)
        testSync(fd, this.header)
        sync.closeSync(fd)
    }

    extractSync = (path) => {

        const fd = sync.openSync(this.path)
        extractSync(fd, this.header, path)
        sync.closeSync(fd)
    }

    getAsBufferSync = () => {

        const fd = sync.openSync(this.path)
        const buffer = getAsBufferSync(fd, this.header)
        sync.closeSync(fd)

        return buffer
    }
}

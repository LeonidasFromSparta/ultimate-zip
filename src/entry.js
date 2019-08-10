import {extractSync, testSync} from './entry-sync'
import {extract, test} from './entry-async'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extract = async (path) => {

        await extract(path, this.header, this.file)
    }

    test = async () => {

        await test(this.header, this.file)
    }

    extractSync = (path) => {

        extractSync(path, this.header, this.file)
    }

    testSync = () => {

        testSync(this.header, this.file)
    }
}

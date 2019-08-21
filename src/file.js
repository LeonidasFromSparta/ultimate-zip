import path from 'path'
import {sync, promise, stream} from './fs-compat'

const READ_FLAG = 'r'

const mkDirRecursive = async (dir) => {

    if (!await promise.exists(dir)) {

        await mkDirRecursive(path.join(dir, '..'))
        await promise.mkdir(dir)
    }
}

const mkDirRecursiveSync = (dir) => {

    if (!sync.existsSync(dir)) {

        mkDirRecursiveSync(path.join(dir, '..'))
        sync.mkdirSync(dir)
    }
}

export default class File {

    constructor(path) {

        this.path = path
        this.fd = null
    }

    open = async () => {

        if (this.fd !== null)
            throw new Error('fd exists')

        this.fd = await promise.open(this.path, READ_FLAG)
    }

    openSync = () => {

        if (this.fd !== null)
            throw new Error('fd exists')

        this.fd = sync.openSync(this.path, READ_FLAG)
    }

    close = async () => {

        if (this.fd === null)
            throw new Error('no fd to close')

        await promise.close(this.fd)
        this.fd = null
    }

    closeSync = () => {

        if (this.fd === null)
            throw new Error('no fd to close')

        sync.closeSync(this.fd)
        this.fd = null
    }

    read = async (pos, len) => {

        if (this.fd === null)
            throw new Error('no fd to read')

        return await promise.read(this.fd, pos, len)
    }

    readSync = (pos, len) => {

        if (this.fd === null)
            throw new Error('no fd to read')

        return sync.readSync(this.fd, pos, len)
    }

    getFileSizeSync = () => {

        if (this.fd === null)
            throw new Error('no fd to access')

        const fdStat = sync.fstatSync(this.fd)
        return fdStat.size
    }

    getFileSize = async () => {

        if (this.fd === null)
            new Error('no fd to access')

        const fdStat = await promise.fstat(this.fd)
        return fdStat.size
    }

    makeDir = async (dir) => {

        await mkDirRecursive(dir)
    }

    makeDirSync = (dir) => {

        mkDirRecursiveSync(dir)
    }

    createWriteStream = (name) => {

        return stream.createWriteStream(name)
    }

    writeFile = async (name, data) => {

        await promise.writeFile(name, data)
    }

    writeFileSync = (name, data) => {

        sync.writeFileSync(name, data)
    }

    getCloseableReadStream = (start, len) => {

        if (this.fd === null)
            throw new Error('no fd to stream')

        return stream.createReadStream(this.fd, start, len)
    }
}

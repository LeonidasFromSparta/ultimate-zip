import {
    openSync,
    closeSync,
    fstatSync,
    readSync,
    existsSync,
    mkdirSync,
    writeFileSync,
    createReadStream,
    createWriteStream
} from 'fs'

import {open, close, fstat, stat, read, mkdir, writeFile} from './promisifed-fs'
import path from 'path'

const READ_FLAG = 'r'

const mkDirRecursive = async (dir) => {

    try {

        await stat(dir)
    } catch (ex) {

        await mkDirRecursive(path.join(dir, '..'))
        await mkdir(dir)
    }
}

const mkDirRecursiveSync = (dir) => {

    if (!existsSync(dir)) {

        mkDirRecursiveSync(path.join(dir, '..'))
        mkdirSync(dir)
    }
}

export default class File {

    constructor(path) {

        this.path = path
        this.fd = null
    }

    open = async () => {

        if (this.fd !== null)
            throw new Error('file already opened')

        this.fd = await open(this.path, READ_FLAG)
    }

    openSync = () => {

        if (this.fd !== null)
            throw new Error('file already opened')

        this.fd = openSync(this.path, READ_FLAG)
    }

    close = async () => {

        if (this.fd === null)
            throw new Error('no fd to close')

        await close(this.fd)
        this.fd = null
    }

    closeSync = () => {

        if (this.fd === null)
            throw new Error('no fd to close')

        closeSync(this.fd)
        this.fd = null
    }

    readSync = (pos, length) => {

        if (this.fd === null)
            throw new Error('fd not opened')

        const buffer = Buffer.alloc(length)
        readSync(this.fd, buffer, 0, length, pos)

        return buffer
    }

    read = async (pos, length) => {

        if (this.fd === null)
            new Error('fd not opened')

        const buffer = Buffer.alloc(length)
        return await read(this.fd, buffer, 0, length, pos)
    }

    getFileSizeSync = () => {

        if (this.fd === null)
            throw new Error('fd not opened')
        
        const fdStat = fstatSync(this.fd)
        return fdStat.size
    }

    getFileSize = async () => {

        if (this.fd === null)
            new Error('fd not opened')

        const fdStat = await fstat(this.fd)
        return fdStat.size
    }

    makeDir = async (dir) => {

        await mkDirRecursive(dir)
    }

    makeDirSync = (dir) => {

        mkDirRecursiveSync(dir)
    }

    createWriteStream = (fileName) => {

        return createWriteStream(fileName)
    }

    writeFile = async (file, data) => {

        await writeFile(file, data)
    }

    writeFileSync = (file, data) => {

        writeFileSync(file, data)
    }

    getCloseableReadStream = (start, length) => {

        if (this.fd === null)
            throw new Error('fd not opened')

        return createReadStream(undefined, {fd: this.fd, start, end: start + length - 1})
    }
}

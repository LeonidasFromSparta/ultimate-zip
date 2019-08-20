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

        const buffer = Buffer.alloc(length)
        readSync(this.fd, buffer, 0, length, pos)

        return buffer
    }

    read = async (pos, length) => {

        const buffer = Buffer.alloc(length)
        const data = await read(this.fd, buffer, 0, length, pos)
        return data
    }

    getFileSize = async () => {

        return (await fstat(this.fd)).size
    }

    getFileSizeSync = () => {

        return fstatSync(this.fd).size
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

    createReadStream = (start, length) => {

        return createReadStream(undefined, {fd: this.fd, start, end: start + length - 1})
    }
}

import {openSync, closeSync, fstatSync, readSync, existsSync, mkdirSync, writeFileSync, createWriteStream} from 'fs'
import {open, close, fstat, read, mkdir, stat, writeFile} from './promisifed-fs'

export default class File {

    constructor(path) {

        this.path = path
        this.fd = null
    }

    open = async () => {

        if (this.fd !== null)
            throw new Error('file already opened')

        this.fd = await open(this.path)
    }

    openSync = () => {

        if (this.fd !== null)
            throw new Error('file already opened')

        this.fd = openSync(this.path)
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

        const buffer = Buffer.allocUnsafe(length)
        return (await read(this.fd, buffer, 0, length, pos)).buffer
    }

    getFileSize = async () => {

        return (await fstat(this.fd)).size
    }

    getFileSizeSync = () => {

        return fstatSync(this.fd).size
    }

    makeDir = async (dir) => {

        try {

            await stat(dir)
        } catch (ex) {

            await mkdir(dir)
        }
    }

    makeDirSync = (dir) => {

        if (!existsSync(dir))
            mkdirSync(dir)
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
}

import fs from 'fs'

export default class File {

    constructor(path) {

        this.path = path
    }

    readBytesSync(pos, end) {

        if (pos < 0)
            pos = 0

        const length = end - pos
        const buffer = Buffer.allocUnsafe(length)

        fs.readSync(Number(this.fd), buffer, 0, length, pos)

        return buffer
    }

    readBytesSyncLength(pos, length) {

        if (pos < 0)
            pos = 0

        const buffer = Buffer.allocUnsafe(length)
        fs.readSync(Number(this.fd), buffer, 0, length, pos)

        return buffer
    }

    createReadStreamWithHighWaterMark(start, end, highWaterMark) {

        return fs.createReadStream(this.path, {start, end, highWaterMark})
    }

    createReadStream(start, end) {

        return fs.createReadStream(this.path, {start, end})
    }

    createFdReadStream(start, end) {

        return fs.createReadStream(null, {fd: this.fd, start, end})
    }

    openSync = () => {

        this.fd = fs.openSync(this.path)
    }

    closeSync = () => {

        fs.closeSync(this.fd)
    }

    getFileSize = () => {

        return fs.fstatSync(this.fd).size
    }

    open = async () => {

        this.fd = await new Promise((resolve) => fs.open(this.path, (err, fd) => resolve(fd)))
    }

    close = async () => {

        await new Promise((resolve) => fs.close(this.fd, () => resolve()))
    }

    makeDir = (dir) => {

        return new Promise((resolve) => fs.mkdir(dir, resolve))
    }

    createWriteStream = (fileName) => {

        return fs.createWriteStream(fileName)
    }
}

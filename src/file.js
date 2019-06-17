import fs from 'fs'

export default class File {

    constructor(path) {

        this.path = path
    }

    readBytesSync(pos, end) {

        const buffer = Buffer.allocUnsafe(end - pos)

        fs.readSync(Number(this.fd), buffer, 0, end - pos, pos)

        return buffer
    }

    getFileSizeBigInt = () => {

        return fs.fstatSync(this.fd).size
    }

    /**
     * Method creates a file read stream from - to specified positions.
     * @param {int} start The start position in the file.
     * @param {int} end The end position in the file.
     * @returns {fs.ReadStream} The readable stream from - to specified positions.
     */
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

        fs.close(this.fd)
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

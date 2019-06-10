import fs from 'fs'

export default class File {

    constructor(path) {

        this.path = path
    }

    /**
     * Method reads last bytes of the file and return in the form of buffer.
     * @param {int} length The length of last bytes.
     * @returns {buffer} The buffer which contains last bytes of the file.
     */
    readLastBytes(length) {

        const fd = fs.openSync(this.path, 'r')
        const stats = fs.fstatSync(fd)

        const numBytesToRead = stats.size < length ? stats.size : length
        const buffer = Buffer.allocUnsafe(numBytesToRead)
        const position = numBytesToRead < length ? 0 : stats.size - length

        fs.readSync(Number(fd), buffer, 0, numBytesToRead, position)
        fs.closeSync(fd)

        return buffer
    }

    readZip32HeaderBytesSync = (length) => {

        const fd = fs.openSync(this.path, 'r')
        const stats = fs.fstatSync(fd)

        const numBytesToRead = stats.size < length ? stats.size : length
        const buffer = Buffer.allocUnsafe(numBytesToRead)
        const position = numBytesToRead < length ? 0 : stats.size - length

        fs.readSync(Number(fd), buffer, 0, numBytesToRead, position)
        fs.closeSync(fd)

        return buffer
    }

    readBytesSync(pos, length) {

        const buffer = Buffer.allocUnsafe(length)

        fs.readSync(Number(this.fd), buffer, 0, length, pos)

        return buffer
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

    createFdReadStream(startPos, endPos) {

        return fs.createReadStream(null, {fd: this.fd, autoClose: false, start: startPos, end: endPos})
    }

    /**
     * Method opens file descriptor.
     */
    openFile() {

        this.fd = fs.openSync(this.path, 'r')
    }

    openFileProm = async () => {

        const promise = new Promise((resolve) => {

            fs.open(this.path, (err, fd) => {

                resolve(fd)
            })
        })

        this.fd = await promise
    }

    /**
     * Method closes file descriptor.
     */
    closeFile() {

        fs.closeSync(this.fd)
    }

    closeFileProm = async () => {

        const promise = new Promise((resolve) => {

            fs.close(this.fd, () => {

                resolve()
            })
        })

        await promise
    }

    makeDir = (dir) => {

        return new Promise((resolve) => {

            fs.mkdir(dir, () => {

                resolve()
            })
        })
    }

    createWriteStream = (filename) => {

        return fs.createWriteStream(filename, {flags: 'w'})
    }
}

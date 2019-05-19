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

        const fd = fs.openSync (this.path, 'r')
        const stats = fs.fstatSync(fd)

        const numBytesToRead = stats.size < length ? stats.size : length
        const buffer = Buffer.allocUnsafe(numBytesToRead)
        const position = numBytesToRead < length ? 0 : stats.size - length

        fs.readSync(Number(fd), buffer, 0, numBytesToRead, position)
        fs.closeSync(fd)

        return buffer
    }

    /**
     * Method creates a file read stream from - to specified positions.
     * @param {int} startPos The start position in the file.
     * @param {int} endPos The end position in the file.
     * @returns {fs.ReadStream} The readable stream from - to specified positions.
     */
    createReadStream(startPos, endPos) {

        return fs.createReadStream(this.path, {start: startPos, end: endPos})
    }

    getFileSize() {

        const fd = fs.openSync (path, 'r')
        const fileSize = fs.fstatSync(fd).size
        fs.closeSync(fd)

        return fileSize
    }
}
import fs from 'fs'

export default class File {

    constructor(path) {

        this.path = path
        this.fd = null
    }

    open = async () => {

        this.fd = await new Promise((resolve) => fs.open(this.path, (err, fd) => resolve(Number(fd))))
    }

    openSync = () => {

        this.fd = fs.openSync(this.path)
    }

    close = async () => {

        await new Promise((resolve) => fs.close(this.fd, () => resolve()))
    }

    closeSync = () => {

        fs.closeSync(this.fd)
    }

    readSync = (pos, length) => {

        if (pos < 0)
            pos = 0

        const buffer = Buffer.alloc(length)
        fs.readSync(this.fd, buffer, 0, length, pos)

        return buffer
    }

    read = async (pos, length) => {

        if (pos < 0)
            pos = 0

        const buffer = Buffer.allocUnsafe(length)
        return await new Promise((resolve) => fs.read(this.fd, buffer, 0, length, pos, (err, bytesRead, buffer) => resolve(buffer)))
    }

    createReadStream(start, end) {

        return fs.createReadStream(this.path, {start, end})
    }

    createFdReadStream(start, end) {

        const fd = this.fd
        const autoClose = false

        return fs.createReadStream(null, {fd, autoClose, start, end})
    }

    getFileSize = async () => {

        return await new Promise((resolve, reject) => fs.fstat(this.fd, (err, stat) => err ? reject(err) : resolve(stat.size)))
    }

    getFileSizeSync = () => {

        return fs.fstatSync(this.fd).size
    }

    makeDir = (dir) => {

        return new Promise((resolve) => fs.mkdir(dir, resolve))
    }

    makeDirSync = (dir) => {

        if (!fs.existsSync(dir))
            fs.mkdirSync(dir)
    }

    createWriteStream = (fileName) => {

        return fs.createWriteStream(fileName)
    }

    writeFile = async (file, data) => {

        await new Promise((resolve) => fs.writeFile(file, data, resolve))
    }

    writeFileSync = (file, data) => {

        fs.writeFileSync(file, data)
    }
}

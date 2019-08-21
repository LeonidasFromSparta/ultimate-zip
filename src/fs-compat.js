import fs from 'fs'

const open = (path, flag) =>
    new Promise((resolve, reject) =>
        fs.open(path, flag, (err, fd) => err ? reject(err) : resolve(fd)))

const close = (fd) =>
    new Promise((resolve, reject) =>
        fs.close(fd, (err) => err ? reject(err) : resolve()))

const fstat = (fd) =>
    new Promise((resolve, reject) =>
        fs.fstat(fd, (err, stat) => err ? reject(err) : resolve(stat)))

const exists = (file) =>
    new Promise((resolve) =>
        fs.stat(file, (err) => err ? resolve(false) : resolve(true)))

const read = (fd, pos, len) =>
    new Promise((resolve, reject) =>
        fs.read(fd, Buffer.alloc(len), 0, len, pos, (err, bytesRead, data) => err ? reject(err) : resolve(data)))

const readSync = (fd, pos, len) => {

    const buff = Buffer.alloc(len)
    fs.readSync(fd, buff, 0, len, pos)
    return buff
}

const mkdir = (dir) =>
    new Promise((resolve, reject) =>
        fs.mkdir(dir, (err) => err ? reject(err) : resolve()))

const writeFile = (name, data) =>
    new Promise((resolve, reject) =>
        fs.writeFile(name, data, (err) => err ? reject(err) : resolve()))

const createReadStream = (fd, pos, len) =>
    fs.createReadStream(null, {fd, start: pos, end: pos + len - 1})

export const sync = {
    openSync: fs.openSync,
    closeSync: fs.closeSync,
    fstatSync: fs.fstatSync,
    existsSync: fs.existsSync,
    readSync,
    mkdirSync: fs.mkdirSync,
    writeFileSync: fs.writeFile
}

export const promise = {
    open,
    close,
    fstat,
    exists,
    read,
    mkdir,
    writeFile
}

export const stream = {
    createReadStream,
    createWriteStream: fs.createWriteStream
}

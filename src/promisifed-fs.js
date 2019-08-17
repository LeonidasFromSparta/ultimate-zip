import {open, close, fstat, stat, read, mkdir, writeFile} from 'fs'

const promisifiedOpen = (path, flag) => new Promise((resolve, reject) => open(path, flag, (err, fd) => err ? reject(err) : resolve(fd)))

const promisifiedClose = (fd) => new Promise((resolve, reject) => close(fd, (err) => err ? reject(err) : resolve()))

const promisifiedFstat = (file) => new Promise((resolve, reject) => fstat(file, (err, fstat) => err ? reject(err) : resolve(fstat)))

const promisifiedStat = (fd) => new Promise((resolve, reject) => stat(fd, (err, stat) => err ? reject(err) : resolve(stat)))

const promisifiedRead = (fd, buffer, offset, length, pos) => new Promise((resolve, reject) => read(this.fd, buffer, 0, length, pos, (err, bytesRead, buffer) => err ? reject(err) : resolve(buffer)))

const promisifiedMkdir = (dir) => new Promise((resolve, reject) => mkdir(dir, (err) => err ? reject(err) : resolve()))

const promisifiedWriteFile = (file, data) => new Promise((resolve, reject) => writeFile(file, data, (err) => err ? reject(err) : resolve()))

export {
    promisifiedOpen as open,
    promisifiedClose as close,
    promisifiedFstat as fstat,
    promisifiedStat as stat,
    promisifiedRead as read,
    promisifiedMkdir as mkdir,
    promisifiedWriteFile as writeFile
}

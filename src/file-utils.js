import fs from 'fs'

export const getBytesFromEndOfFile = (path, bytes) => {

    const fd = fs.openSync (path, 'r')
    const stats = fs.fstatSync(fd)

    const numBytesToRead = stats.size < bytes ? stats.size : bytes
    const buffer = Buffer.alloc(numBytesToRead)
    const position = numBytesToRead < bytes ? 0 : stats.size - bytes

    fs.readSync(Number(fd), buffer, 0, numBytesToRead, position)
    fs.closeSync(fd)

    return buffer
}

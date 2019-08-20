import {createInflateRaw, inflateRawSync, inflateRaw} from 'zlib'
import {Writable} from 'stream'
import {CRC32, CRC32Stream} from './crc32'

const compareChecksum = (val1, val2) => {

    if (val1 !== val2)
        throw 'Bad Checksum Err'
}

const bufferedInflater = async (header, deflated) => {

    const inflated = header.isDeflated() ?
        await new Promise((resolve, reject) => inflateRaw(deflated, (err, inflated) => err ? reject(err) : resolve(inflated))) : deflated

    __private__.compareChecksum(header.checksum, new CRC32().update(inflated).getValue())
    return inflated
}

const streamingInflater = async (header, reader) => {

    const crc32Stream = new CRC32Stream(new CRC32())
    const inflater = createInflateRaw()

    reader.on('end', () => __private__.compareChecksum(header.checksum, crc32Stream.getValue()))

    return header.isDeflated() ? reader.pipe(inflater) : reader
}

const inflaterSync = (header, buffer) => {

    const inflated = header.isDeflated() ? inflateRawSync(buffer) : buffer
    __private__.compareChecksum(header.checksum, new CRC32().update(inflated).getValue())
    return inflated
}

const __private__ = {
    compareChecksum
}

export {bufferedInflater, inflaterSync, streamingInflater, __private__}

import {sync, async} from './zlib-compat'
import {CRC32, CRC32Stream} from './crc32'

const compareChecksum = (val1, val2) => {

    if (val1 !== val2)
        throw new Error('bad checksum')
}

const inflaterSync = (isDeflated, deflated, checksum) => {

    const inflated = isDeflated ? sync.inflateSync(deflated) : deflated
    compareChecksum(checksum, new CRC32().update(inflated).getValue())
    return inflated
}

const bufferedInflater = async (isDeflated, deflated, checksum) => {

    const inflated = isDeflated ? await async.inflate(deflated) : deflated
    compareChecksum(checksum, new CRC32().update(inflated).getValue())
    return inflated
}

const streamingInflater = async (isDeflated, deflated, checksum) => {

    const crc32Stream = new CRC32Stream()
    const inflater = async.streamingInflate()

    crc32Stream.on('finish', () => compareChecksum(checksum, crc32Stream.getValue()))

    if (isDeflated)
        deflated.pipe(inflater).pipe(crc32Stream)
    else
        deflated.pipe(crc32Stream)

    return crc32Stream
}

export {inflaterSync, bufferedInflater, streamingInflater}

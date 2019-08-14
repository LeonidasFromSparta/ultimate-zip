import {createInflateRaw, inflateRawSync, inflateRaw} from 'zlib'
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

/*
const streamingInflater = async (header, locLength, file, writer) => {

    import {Writable} from 'stream'

export default class DumpWriter extends Writable {

    _write = (chunk, encoding, callback) => callback()

    _writev = (chunks, callback) => callback()
}

    if (header.deflatedSize < 1048576) {

        const buffer = await file.read(header.localOffset + locLength, header.deflatedSize)
        const deflated = await new Promise((resolve) => inflateRaw(buffer, (err, buffer) => resolve(buffer)))
    }

    const crc32Stream = new CRC32Stream(new CRC32())

    const promise = new Promise((resolve) => {



        const reader = file.createReadStream(header.localOffset + locLength, header.localOffset + locLength + header.deflatedSize - 1)

        if (header.isEmpty()) {

            writer.end(Buffer.alloc(0))
        } else {

            if (header.isDeflated())
                reader.pipe(createInflateRaw()).pipe(crc32Stream).pipe(writer)
            else
                reader.pipe(crc32Stream).pipe(writer)
        }

        writer.on('finish', resolve())
    })

    await promise

    // if (header.checksum !== crc32Stream.getValue())
    //    throw 'bad file cheksum'
}
*/

const inflaterSync = (header, buffer) => {

    const inflated = header.isDeflated() ? inflateRawSync(buffer) : buffer
    __private__.compareChecksum(header.checksum, new CRC32().update(inflated).getValue())
    return inflated
}

const __private__ = {
    compareChecksum
}

export {bufferedInflater, inflaterSync, __private__}

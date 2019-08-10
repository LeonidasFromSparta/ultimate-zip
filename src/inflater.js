import {createInflateRaw, inflateRawSync, inflateRaw} from 'zlib'
import CRC32 from './crc32'
import CRC32Stream from './crc32-stream'

const bufferedInflater = async (header, locLength, file) => {

    const buffer = await file.read(header.localOffset + locLength, header.deflatedSize)
    const promise = new Promise((resolve) => inflateRaw(buffer, (err, buffer) => resolve(buffer)))
    const deflated = header.isDeflated() ? await promise : buffer

    if (header.checksum !== new CRC32().update(deflated).getValue())
        throw 'bad file cheksum'

    return deflated
}

const streamingInflater = async (header, locLength, file, writer) => {

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

const inflaterSync = (header, locLength, file) => {

    const buffer = file.readBytesSyncLength(header.localOffset + locLength, header.deflatedSize)
    const deflated = header.isDeflated() ? inflateRawSync(buffer) : buffer

    if (header.checksum !== new CRC32().update(deflated).getValue())
        throw 'bad file cheksum'

    return deflated
}

export {bufferedInflater, streamingInflater, inflaterSync}

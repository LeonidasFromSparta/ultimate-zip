import {createInflateRaw, inflateRawSync} from 'zlib'
import CRC32 from './crc32'
import CRC32Stream from './crc32-stream'

const inflater = async (header, reader, writer) => {

    const crc32Stream = new CRC32Stream(new CRC32())

    const promise = new Promise((resolve) => {

        const size = header.deflatedSize
        let bytesCounter = 0

        let inflater

        if (header.isDeflated()) {

            inflater = createInflateRaw()
            inflater.pipe(crc32Stream).pipe(writer)
        } else {

            inflater = crc32Stream
            inflater.pipe(writer)
        }

        inflater.on('drain', () => reader.resume())
        writer.on('finish', resolve)

        reader.resume()

        reader.on('data', (chunk) => {

            const remainingBytes = size - bytesCounter

            if (chunk.length < remainingBytes) {

                if (!inflater.write(chunk, 'buffer'))
                    reader.pause()

                bytesCounter += chunk.length
                return
            }

            inflater.end(chunk.slice(0, remainingBytes))

            reader.pause()
            reader.removeAllListeners()
            reader.unshift(chunk.slice(remainingBytes))
        })
    })

    await promise

    if (header.checksum !== crc32Stream.getValue())
        throw 'bad file cheksum'
}

const inflaterSync = (locLength, header, file) => {

    const buffer = file.readBytesSyncLength(header.localOffset + locLength, header.deflatedSize)

    const deflated = header.isDeflated() ? inflateRawSync(buffer) : buffer

    if (header.checksum !== new CRC32().update(deflated).getValue())
        throw 'bad file cheksum'

    return deflated
}

export {inflater, inflaterSync}



inflaterSync = (pos, header, file) => {

    const buffer = file.readBytesSyncLength(pos, header.length)

    if (header.checksum !== new CRC32().update(buffer).getValue())
        throw 'keke chekisum'


    const promise = new Promise((resolve) => {

        const size = this.header.inflatedSize
        let bytesCounter = 0

        const callback = (chunk) => {

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
        }

        reader.on('data', callback)

        const inflater = this.header.isDeflated() ? createInflateRaw() : new PassThrough()
        inflater.pipe(crc32Stream).pipe(writer)
        inflater.on('drain', readerResume)

        writer.on('finish', resolve)

        readerResume()
    })

    await promise

    if (this.header.checksum !== crc32Stream.getValue())
        throw 'keke again'
}

export {inflaterSync}

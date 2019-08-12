import DumpWriter from './dump-writer'
import {readLocHeader} from './file-headers'
import {bufferedInflater, streamingInflater} from './inflater'

const extract = async (path, header, file) => {

    const name = path + '/' + header.fileName

    if (header.isDirectory())
        return await file.makeDir(name)

    const locHeader = await readLocHeader(header.localOffset, file)
    const pos = locHeader.length

    if (header.isEmpty())
        return

    if (header.deflatedSize < 1048576) {

        const buffer = await file.read(header.localOffset + pos, header.deflatedSize)
        const deflated = await bufferedInflater(header, buffer)
        file.writeFile(name, deflated)
    }

    // const writer = file.createWriteStream(name)
    // await inflater(header, pos, file, writer)
}

const getAsBuffer = async (header, file) => {

    if (header.isDirectory())
        return Buffer.alloc(0)

    const locHeader = await readLocHeader(header.localOffset, file)
    const pos = locHeader.length

    const buffer = await file.read(header.localOffset + pos, header.deflatedSize)
    return await bufferedInflater(header, buffer)
}

const test = async (header, file) => {

    if (header.isDirectory())
        return

    const locHeader = await readLocHeader(header.localOffset, file)
    const pos = locHeader.length

    if (header.deflatedSize < 1048576) {

        const buffer = await file.read(header.localOffset + pos, header.deflatedSize)
        await bufferedInflater(header, buffer)
    }

    // const writer = new DumpWriter()
    // await inflater(header, pos, file, writer)
}

export {extract, test, getAsBuffer}

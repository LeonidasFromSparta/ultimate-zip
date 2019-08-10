import DumpWriter from './dump-writer'
import {readLocHeader} from './headers'
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

        const deflated = await bufferedInflater(header, pos, file)
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

    return await bufferedInflater(header, pos, file)
}

const test = async (header, file) => {

    if (header.isDirectory())
        return

    const locHeader = await readLocHeader(header.localOffset, file)
    const pos = locHeader.length

    if (header.deflatedSize < 1048576)
        await bufferedInflater(header, pos, file)

    // const writer = new DumpWriter()
    // await inflater(header, pos, file, writer)
}

export {extract, test, getAsBuffer}

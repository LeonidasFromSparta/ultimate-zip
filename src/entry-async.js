import DumpWriter from './dump-writer'
import {readLocHeader} from './headers'
import {smallInflater, inflater} from './inflater'

const extract = async (path, header, file) => {

    const name = path + '/' + header.fileName

    if (header.isDirectory())
        return await file.makeDir(name)

    const locHeader = await readLocHeader(header.localOffset, file)
    const pos = locHeader.length

    if (header.isEmpty())
        return

    if (header.deflatedSize < 1048576) {

        const deflated = await smallInflater(header, pos, file)
        file.writeFile(name, deflated)
    }

    // const writer = file.createWriteStream(name)
    // await inflater(header, pos, file, writer)
}

const test = async (header, file) => {

    if (header.isDirectory())
        return

    const locHeader = await readLocHeader(header.localOffset, file)
    const pos = locHeader.length

    const writer = new DumpWriter()
    await inflater(header, pos, file, writer)
}

export {extract, test}

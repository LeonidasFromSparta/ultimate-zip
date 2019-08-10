import {readLocHeaderSync} from './headers'
import {inflaterSync} from './inflater'

const extractSync = async (path, header, file) => {

    const name = path + '/' + header.fileName

    if (header.isDirectory())
        return file.makeDirSync(name)

    if (header.isEmpty())
        return

    const locHeader = readLocHeaderSync(header.localOffset, file)
    const pos = locHeader.length

    const deflated = inflaterSync(header, pos, file)
    file.writeFileSync(name, deflated)
}

const getAsBufferSync = async (header, file) => {

    if (header.isDirectory())
        return Buffer.alloc(0)

    const locHeader = await readLocHeaderSync(header.localOffset, file)
    const pos = locHeader.length

    return inflaterSync(header, pos, file)
}

const testSync = (header, file) => {

    if (header.isDirectory())
        return

    if (header.isEmpty())
        return

    const locHeader = readLocHeaderSync(header.localOffset, file)
    const pos = locHeader.length

    inflaterSync(header, pos, file)
}

export {extractSync, testSync, getAsBufferSync}

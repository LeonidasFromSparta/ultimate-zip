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

    const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)

    const deflated = inflaterSync(header, buffer)
    file.writeFileSync(name, deflated)
}

const getAsBufferSync = (header, file) => {

    if (header.isDirectory())
        throw 'Entry is a directory'

    const locHeader = readLocHeaderSync(header.localOffset, file)
    const pos = locHeader.length

    const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)
    return inflaterSync(header, buffer)
}

const testSync = (header, file) => {

    if (header.isDirectory() || header.isEmpty())
        return

    const locHeader = readLocHeaderSync(header.localOffset, file)
    const pos = locHeader.length

    const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)
    inflaterSync(header, buffer)
}

export {extractSync, testSync, getAsBufferSync}

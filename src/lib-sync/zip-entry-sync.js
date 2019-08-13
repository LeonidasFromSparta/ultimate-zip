import {readLocHeader} from './../utils'
import {inflaterSync} from '../inflater'
import {LOC_HDR} from './../constants'

const extractSync = (path, header, file) => {

    const name = path + '/' + header.fileName

    if (header.isDirectory())
        return file.makeDirSync(name)

    if (header.isEmpty())
        return file.writeFileSync(name, Buffer.alloc(0))

    const hdrBuff = file.readSync(header.localOffset, LOC_HDR)
	const locHeader = readLocHeader(hdrBuff)
	const pos = locHeader.length

	const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)

	const deflated = inflaterSync(header, buffer)
	file.writeFileSync(name, deflated)
}

const getAsBufferSync = (header, file) => {

    if (header.isDirectory())
        throw 'Entry is a directory'

    const hdrBuff = file.readSync(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)
    return inflaterSync(header, buffer)
}

const testSync = (header, file) => {

    if (header.isDirectory() || header.isEmpty())
        return

    const hdrBuff = file.readSync(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)
    inflaterSync(header, buffer)
}

export {extractSync, testSync, getAsBufferSync}

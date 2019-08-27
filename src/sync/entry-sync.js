import path from 'path'
import {readLocHeader} from '../utils'
import {inflaterSync} from '../inflater'
import {LOC_HDR} from '../constants'

const extractSync = (dir, header, file) => {

    const name = dir + '/' + header.fileName

    if (header.isDirectory()) {

        file.makeDirSync(name)
        return
    }

    const dirname = path.dirname(name)
    file.makeDirSync(dirname)

    if (header.isEmpty()) {

        file.writeFileSync(name, Buffer.alloc(0))
        return
    }

    const hdrBuff = file.readSync(header.localOffset, LOC_HDR)
	const locHeader = readLocHeader(hdrBuff)
	const pos = locHeader.length

    const isDeflated = header.isDeflated()
	const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

	const deflated = inflaterSync(isDeflated, buffer, checksum)
	file.writeFileSync(name, deflated)
}

const getAsBufferSync = (header, file) => {

    if (header.isDirectory())
        throw 'Entry is a directory'

    file.openSync()
    const hdrBuff = file.readSync(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum
    file.closeSync()

    return inflaterSync(isDeflated, buffer, checksum)
}

const testSync = (header, file) => {

    if (header.isDirectory() || header.isEmpty())
        return

    const hdrBuff = file.readSync(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const buffer = file.readSync(header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

    inflaterSync(isDeflated, buffer, checksum)
}

export {extractSync, testSync, getAsBufferSync}

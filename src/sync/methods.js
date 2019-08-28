import path from 'path'
import {readLocHeader} from '../lib/utils'
import {inflaterSync} from '../lib/inflater'
import {LOC_HDR} from '../lib/constants'
import {sync} from '../lib/fs-compat'

const extractSync = (fd, header, dir) => {

    const name = dir + '/' + header.fileName

    if (header.isDirectory()) {

        sync.makeDirBackSync(name)
        return
    }

    const dirname = path.dirname(name)
    sync.makeDirBackSync(dirname)

    if (header.isEmpty()) {

        sync.writeFileSync(name, Buffer.alloc(0))
        return
    }

    const hdrBuff = sync.readSync(fd, header.localOffset, LOC_HDR)
	const locHeader = readLocHeader(hdrBuff)
	const pos = locHeader.length

    const isDeflated = header.isDeflated()
	const buffer = sync.readSync(fd, header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

	const deflated = inflaterSync(isDeflated, buffer, checksum)
	sync.writeFileSync(name, deflated)
}

const getAsBufferSync = (fd, header) => {

    if (header.isDirectory())
        throw 'Entry is a directory'

    const hdrBuff = sync.readSync(fd, header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const buffer = sync.readSync(fd, header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

    return inflaterSync(isDeflated, buffer, checksum)
}

const testSync = (fd, header) => {

    if (header.isDirectory() || header.isEmpty())
        return

    const hdrBuff = sync.readSync(fd, header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const buffer = sync.readSync(fd, header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

    inflaterSync(isDeflated, buffer, checksum)
}

export {extractSync, testSync, getAsBufferSync}

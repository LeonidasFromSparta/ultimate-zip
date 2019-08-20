import path from 'path'
import {Readable} from 'stream'
import {readLocHeader} from './../utils'
import {bufferedInflater, streamingInflater} from '../inflater'
import {LOC_HDR} from './../constants'

const extract = async (dir, header, file) => {

    const name = dir + '/' + header.fileName

    if (header.isDirectory()) {

        await file.makeDir(name)
        return
    }

	const dirname = path.dirname(name)
    await file.makeDir(dirname)

    if (header.isEmpty()) {

        await file.writeFile(name, Buffer.alloc(0))
        return
    }

    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const buffer = await file.read(header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

    const deflated = await bufferedInflater(isDeflated, buffer, checksum)
    await file.writeFile(name, deflated)
}

const getAsBuffer = async (header, file) => {

    if (header.isDirectory())
        throw new Error('zip entry ' + header.fileName + ' is a directory')

    if (header.isEmpty())
        return Buffer.alloc(0)

    await file.open()
    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const content = await file.read(header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum
    await file.close()

    return bufferedInflater(isDeflated, content, checksum)
}

const getAsStream = async (header, file) => {

    if (header.isDirectory())
        throw new Error('zip entry ' + header.fileName + ' is a directory')

    if (header.isEmpty())
        throw new Error('cannot create readable from an empty file')

    await file.open()

    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const content = await file.getCloseableReadStream(header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

    return streamingInflater(isDeflated, content, checksum)
}

const test = async (header, file) => {

    if (header.isDirectory() || header.isEmpty())
        return

    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const isDeflated = header.isDeflated()
    const content = await file.read(header.localOffset + pos, header.deflatedSize)
    const checksum = header.checksum

    await bufferedInflater(isDeflated, content, checksum)
}

export {extract, test, getAsBuffer, getAsStream}

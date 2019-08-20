import {readLocHeader} from './../utils'
import {bufferedInflater, streamingInflater} from '../inflater'
import {LOC_HDR} from './../constants'

const extract = async (path, header, file) => {

    const name = path + '/' + header.fileName

    if (header.isDirectory()) {

        await file.makeDir(name)
        return
    }

    if (header.isEmpty()) {

        await file.writeFile(name, Buffer.alloc(0))
        return
    }

    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const buffer = await file.read(header.localOffset + pos, header.deflatedSize)
    const deflated = await bufferedInflater(header, buffer)
    await file.writeFile(name, deflated)
}

const getAsBuffer = async (header, file) => {

    if (header.isDirectory())
        throw new Error('zip entry ' + this.header.fileName + ' is a directory')

    if (header.isEmpty())
        return Buffer.alloc(0)

    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const content = await file.read(header.localOffset + pos, header.deflatedSize)
    return bufferedInflater(header, content)
}

const getAsStream = async (header, file) => {

    if (header.isDirectory())
        throw new Error('zip entry ' + this.header.fileName + ' is a directory')

    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const content = await file.getReadStream(header.localOffset + pos, header.deflatedSize)
    return streamingInflater(header, content)
}

const test = async (header, file) => {

    if (header.isDirectory() || header.isEmpty())
        return

    const hdrBuff = await file.read(header.localOffset, LOC_HDR)
    const locHeader = readLocHeader(hdrBuff)
    const pos = locHeader.length

    const content = await file.read(header.localOffset + pos, header.deflatedSize)
    await bufferedInflater(header, content)
}

export {extract, test, getAsBuffer, getAsStream}

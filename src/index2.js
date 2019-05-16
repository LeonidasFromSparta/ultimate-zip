import fs from 'fs'
import {findLastBytes} from './file-utils'
import EOCDR32 from './EOCDR32'

const _64kb = 65536 + 22
const buff = findLastBytes('wow.zip', _64kb)

console.log(buff)

const eocd32 = new EOCDR32(buff)

debugger


const code = fs.readFileSync('wow.zip')

/*
console.log('Local file header signature = 0x04034b50 (read as a little-endian number)')
const localFileHeaderSignature = code.slice(0, 4).reverse().toString('hex')
console.log(localFileHeaderSignature)

console.log('Version needed to extract (minimum)')
const versionNeededToExtract = code.slice(4, 6).readUInt8()
console.log(versionNeededToExtract)

console.log('general purpose bit flag')
const generalPurposeBitFlag = `0x${code.slice(6, 8).toString('hex')}`
console.log(generalPurposeBitFlag)

const compressionMethod = code.slice(8, 10).readUInt8()
console.log('compression method: ' + compressionMethod)

const time = code.slice(10, 12).readUInt8()
console.log('time: ' + time)

const date = code.slice(12, 14).readUInt8()
console.log('date: ' + date)

const crc32 = `0x${code.slice(14, 18).toString('hex')}`
console.log('crc 32: ' + crc32)

const compressedSize = code.slice(18, 22).readUInt16LE()
console.log('compressed size: ' + compressedSize)

const uncompressedSize = code.slice(22, 26).readUInt16LE()
console.log('uncompressed size: ' + uncompressedSize)

const fileNameLength = code.slice(26, 28).readUInt8()
console.log('file name length: ' + fileNameLength)

const extraFieldLength = code.slice(28, 30).readUInt8()
console.log('extra field length: ' + extraFieldLength)

const fileName = code.slice(30, 30 + fileNameLength).toString()
console.log('file name: ' + fileName)

const extraField = code.slice(30 + fileNameLength, 30 + extraFieldLength).toString()
console.log('extra field: ' + extraField)

const data = code.slice(30 + fileNameLength + extraFieldLength, 30 + uncompressedSize).toString()
console.log('data: ' + data)
*/



debugger

console.log(code)

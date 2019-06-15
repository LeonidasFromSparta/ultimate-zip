import UZip from './u-zip'
import CentralHeaderDecoder from './central-header-decoder'

const start = process.hrtime.bigint()
console.log('start unzip: ' + start)

// const zip = new UZip('C:/Users/leonw/Desktop/ultimate-zip/samples/7z-ubuntu-normal.zip', {cacheHeaders: true})
// const zip = new UZip('./samples/big.zip', {cacheHeaders: true})
const zip = new UZip('./samples/Lorem ipsum.zip', {cacheHeaders: true})
/*
const decoder = new CentralHeaderDecoder()

const headerBuf = Buffer.from([
    0x50, 0x4b, 0x01, 0x02, 0x3f, 0x00, 0x14, 0x00, 0x00, 0x00, 0x08, 0x00,
    0x35, 0x0e, 0xcf, 0x4e, 0xab, 0x17, 0x8a, 0xaf, 0x00, 0x00, 0x00, 0x0b,
    0x01, 0x00, 0x00, 0x0f, 0x00, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x4c, 0x6f, 0x72, 0x65,
    0x6d, 0x69, 0x70, 0x73, 0x75, 0x6d, 0x2e, 0x74, 0x78, 0x74, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x18, 0x00, 0xed, 0x3f, 0x7f, 0x73,
    0x03, 0x23, 0xd5, 0x01, 0x94, 0xd4, 0x16, 0x74, 0x03, 0x23, 0xd5, 0x01,
    0xaf, 0x06, 0x1a, 0x5e, 0x03, 0x23, 0xd5, 0x01])

    debugger

const additionalBuf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00])

debugger

const bigChunk = Buffer.concat([headerBuf, additionalBuf], headerBuf.length + additionalBuf.length)

console.log(bigChunk)

const remaminigChunk = decoder.update(bigChunk)

console.log(remaminigChunk)
*/

// console.log(zip.getInfo())

/*
zip._readEntries().then(async (data) => {

    for (const e of data)
        await e.extract('./extr')
})
*/

/*
zip.getEntries().then(async (data) => {

    await data[0].getLocalHeader()
})
*/

/*
zip.extractArchive('./extr').then(() => {

    const end = process.hrtime.bigint()
    console.log('unzip time: ' + new Number((end - start)) / 1e+9)
})
*/

zip.testArchive().then(() => {

    const end = process.hrtime.bigint()
    console.log('unzip time: ' + new Number((end - start)) / 1e+9)
})

/*
zip.extractByRegex('asd', /Eam ex.txt/).then(() => {

})
*/


import UZip from './u-zip'

const start = process.hrtime.bigint()
console.log('start unzip: ' + start)

// const zip = new UZip('C:/Users/leonw/Desktop/ultimate-zip/samples/7z-ubuntu-normal.zip', {cacheHeaders: true})
// const zip = new UZip('./samples/big.zip', {cacheHeaders: true})
const zip = new UZip('./samples/Lorem ipsum.zip', {cacheHeaders: true})

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


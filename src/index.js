import UZip from './u-zip'

const start = process.hrtime.bigint()
console.log('start unzip: ' + start)

// const zip = new UZip('./samples/big.zip')
// const zip = new UZip('./samples/Lorem ipsum.zip')
// const zip = new UZip('./samples/4g.zip')


const zip = new UZip('./samples/7z-windows-normal.zip')

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

zip.extractArchive('./extr').then(() => {

    const end = process.hrtime.bigint()
    console.log('unzip time: ' + new Number((end - start)) / 1e+9)

    console.log('testo now')

    zip.testArchive().then(() => {

        const end = process.hrtime.bigint()
        console.log('unzip time: ' + new Number((end - start)) / 1e+9)
    })
})

/*
zip.testArchive().then(() => {

    const end = process.hrtime.bigint()
    console.log('unzip time: ' + new Number((end - start)) / 1e+9)
})
*/

/*
zip.testFile('node_modules/@electron/docs-parser/yarn.lock').then(() => {

    const end = process.hrtime.bigint()
    console.log('unzip time: ' + new Number((end - start)) / 1e+9)
})
*/

/*
zip.extractByRegex('asd', /Eam ex.txt/).then(() => {

})
*/

/*
process.on('uncaughtException', function (exception) {
    console.log(exception); // to see your exception details in the console
    // if you are on production, maybe you can send the exception details to your
    // email as well ?
  });
*/

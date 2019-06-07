import UZip from './u-zip'

const start = process.hrtime.bigint()
console.log('start unzip: ' + start)

const zip = new UZip('C:/Users/leonw/Desktop/ultimate-zip.js/samples/7z-normal-17k-files.zip', {cacheHeaders: true})

/*
zip.getInfo().then((data) => {

    console.log(data)

    zip.testArchive().then((data) => {

    })
})
*/

zip.extractArchive('C:/Users/leonw/Desktop/ultimate-zip.js/extr').then(() => {


    const end = process.hrtime.bigint()
    console.log('unzip time: ' + new Number((end - start)) / 1e+9)
})

/*
zip.extractAll().then(() => {


})
*/

/*
zip.extractByRegex('asd', /Eam ex.txt/).then(() => {



})
*/

// zip.testArchiveSync()

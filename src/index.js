
import UZip from './u-zip'

const start = process.hrtime.bigint()
console.log('start unzip: ' + start)

const zip = new UZip('C:/Users/leonidw/Desktop/ultimate-zip.js/samples/benchmark-17k-files.zip', {cacheHeaders: true})

/*
zip.getInfo().then((data) => {

    console.log(data)

    zip.testArchive().then((data) => {

    })
})
*/

zip.extractAll('C:/Users/leonidw/Desktop/ultimate-zip.js/mytest').then((data) => {


    const end = process.hrtime.bigint()
    console.log('end unzip: ' + end)
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

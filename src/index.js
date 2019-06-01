
import UZip from './u-zip'

const zip = new UZip('C:/Users/leonw/Desktop/ultimate-zip.js/samples/deflate-normal-only-files.zip', {cacheHeaders: true})
zip.getInfo().then((data) => {

    console.log(data)
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

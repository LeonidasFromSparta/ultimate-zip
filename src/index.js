
import UZip from './u-zip'

const zip = new UZip('C:/Users/leonw/Desktop/ultimate-zip.js/samples/deflate-normal-only-files.zip', {cacheHeaders: true})
console.log(zip.toString())

/*
zip.extractAll().then(() => {


})
*/


zip.extractByRegex('asd', /Eam ex.txt/).then(() => {



})


// zip.testArchiveSync()

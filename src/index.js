
import UZip from './u-zip'

const zip = new UZip('C:/Users/leonw/Desktop/ultimate-zip.js/samples/deflate-normal-only-files-3.zip', {cacheHeaders: true})

zip.getInfo().then((data) => {

    console.log(data)

    zip.testArchive().then((data) => {

    })
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

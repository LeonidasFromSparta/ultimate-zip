
import UZip from './u-zip'

const zip = new UZip('C:/Users/leonw/ultimate-zip.js/samples/deflate-normal-only-files.zip')
// console.log(zip.toString())
zip.extractAll().then(() => {


})


// zip.testArchiveSync()

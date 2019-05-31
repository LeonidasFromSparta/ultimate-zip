
import Zip from './zip'

const zip = new Zip('C:/Users/leonw/ultimate-zip.js/samples/deflate-normal-only-files.zip')
// console.log(zip.toString())
zip.extractAll().then(() => {


})
// zip.testArchiveSync()

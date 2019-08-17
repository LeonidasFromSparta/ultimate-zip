import UZip from './u-zip'

new UZip('C:/Users/leonw/Desktop/ultimate-zip/tests/integration/assets/win-7z-store.zip').extractArchiveSync('./integration_2')

const zipName = './samples/7z-windows-normal.zip'
let start, end
let zip

start = process.hrtime.bigint()
console.log('START SYNC TEST: ' + start)

zip = new UZip(zipName)
zip.testArchiveSync()

end = process.hrtime.bigint()
console.log('TEST SYNC TIME: ' + new Number((end - start)) / 1e+9)

start = process.hrtime.bigint()
console.log('START SYNC EXTRACT: ' + start)

// zip = new UZip(zipName)
zip = new UZip('C:/Users/leonw/Desktop/ultimate-zip/tests/integration/assets/ultra.zip')
zip.extractArchiveSync('./extr')

end = process.hrtime.bigint()
console.log('EXTRACT SYNC TIME: ' + new Number((end - start)) / 1e+9)

;
(async () => {

    start = process.hrtime.bigint()
    console.log('START AWAIT TEST: ' + start)

    zip = new UZip(zipName)
    await zip.testArchive('./extr')

    end = process.hrtime.bigint()
    console.log('TEST AWAIT TIME ' + new Number((end - start)) / 1e+9)

    start = process.hrtime.bigint()
    console.log('START AWAIT EXTRACT: ' + start)

    zip = new UZip(zipName)
    await zip.extractArchive('./extr')

    end = process.hrtime.bigint()
    console.log('EXTRACT AWAIT TIME ' + new Number((end - start)) / 1e+9)
})()

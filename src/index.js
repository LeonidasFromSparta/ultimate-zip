import UZip from './u-zip-api'

let start, end

const zip = new UZip('./samples/7z-windows-normal.zip')
// new UZip('./samples/7z-windows-normal.zip').getEntriesSync()

start = process.hrtime.bigint()
console.log('START SYNC TEST: ' + start)

zip.testArchiveSync()

end = process.hrtime.bigint()
console.log('TEST SYNC TIME: ' + new Number((end - start)) / 1e+9)


start = process.hrtime.bigint()
console.log('START SYNC EXTRACT: ' + start)

zip.extractArchiveSync('./extr')

end = process.hrtime.bigint()
console.log('EXTRACT SYNC TIME: ' + new Number((end - start)) / 1e+9)

;
(async () => {

    start = process.hrtime.bigint()
    console.log('START AWAIT TEST: ' + start)

    await zip.testArchive('./extr')

    end = process.hrtime.bigint()
    console.log('TEST AWAIT TIME ' + new Number((end - start)) / 1e+9)

    start = process.hrtime.bigint()
    console.log('START AWAIT EXTRACT: ' + start)

    await zip.extractArchive('./extr')

    end = process.hrtime.bigint()
    console.log('EXTRACT AWAIT TIME ' + new Number((end - start)) / 1e+9)
})()

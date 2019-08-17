import UZip from './../../src/u-zip'

(async () => {

    debugger
    // await new UZip('./samples/7z-windows-normal.zip').extractArchive('./extr')
    await new UZip('./samples/7z-windows-normal.zip').getEntries()
    console.log('keke doine')
})()

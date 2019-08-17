import UZip from './../../src/u-zip'

(async () => {

    debugger
    // await new UZip('./samples/7z-windows-normal.zip').extractArchive('./extr')
    new UZip('./tests/integration/assets/win-7z-fast.zip').getEntries().then((entries)=> {

        console.log(entries)
        debugger
    })
    console.log('keke doine')
})()

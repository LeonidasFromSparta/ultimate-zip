import UZip from './../../src/u-zip'

(async () => {

    debugger
    await new UZip('./tests/integration/assets/win-7z-store.zip').extractArchive('./tests/integration/assets/extracted/extractArchive/win-7z-store')
})()

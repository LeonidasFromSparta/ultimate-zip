import UZip from './../../src/u-zip'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/extracted'

;
(async () => {

    debugger
    const keke = [

    new UZip(ASSETS_PATH + '/win-7z-store.zip')
    .extractArchive(EXTRACT_PATH + '/promise/win-7z-store'),

    new UZip(ASSETS_PATH + '/win-7z-fast.zip')
        .extractArchive(EXTRACT_PATH + '/promise/win-7z-fast'),

    new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
        .extractArchive(EXTRACT_PATH + '/promise/win-7z-fastest'),

    new UZip(ASSETS_PATH + '/win-7z-normal.zip')
        .extractArchive(EXTRACT_PATH + '/promise/win-7z-normal'),

    new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
        .extractArchive(EXTRACT_PATH + '/promise/win-7z-maximum'),

    new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
        .extractArchive(EXTRACT_PATH + '/promise/win-7z-ultra'),

    new UZip(ASSETS_PATH + '/win-7z-store.zip')
        .testArchive(),

    new UZip(ASSETS_PATH + '/win-7z-fast.zip')
        .testArchive(),

    new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
        .testArchive(),

    new UZip(ASSETS_PATH + '/win-7z-normal.zip')
        .testArchive(),

    new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
        .testArchive(),

    new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
        .testArchive()
    ]

    await Promise.all(keke)
})()

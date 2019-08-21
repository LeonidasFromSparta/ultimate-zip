import UZip from './../../src/index'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

;
(async () => {

    debugger
    const badChecksumZipPath = ASSETS_PATH + '/bad checksum/bad checksum.zip'

    await new Promise((resolve) =>
        new UZip(badChecksumZipPath).testArchive((err) => {

            debugger
            expect(err).toBeInstanceOf(Error)
            resolve()
        }))
    debugger
    debugger
    debugger
    debugger
})()

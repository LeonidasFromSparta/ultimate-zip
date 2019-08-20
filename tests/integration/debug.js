import UZip from './../../src/u-zip'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

;
(async () => {

    debugger
    const entries = await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .getEntries((err, entries) => err ? reject(err) : resolve(entries))
    })

    await new Promise((resolve, reject) => {

        entries[10].getAsStream((err, stream) => err ? reject(err) : resolve(stream))
    })
    debugger
    debugger
    debugger
    debugger
})()

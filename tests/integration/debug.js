import UZip from './../../src/index'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

;
(async () => {

    debugger
    const data = new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
        .getEntriesSync()[4].getAsBufferSync()
    debugger
    debugger
    debugger
    debugger
})()

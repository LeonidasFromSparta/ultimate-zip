import UZip from './../../src/index'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

;
(async () => {

    debugger
    // const data = new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')

    const uz = new UZip('C:/Users/leonw/Desktop/ultimate-zip/samples/7z-windows-normal.zip')

    const w1 = uz.testArchiveSync('C:/Users/leonw/Desktop/ultimate-zip/samples/7z-windows-normal/')

    debugger
    debugger
    debugger
    debugger
})()

import UZip from './../../src/index'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

import {readdirSync} from 'fs'

;
(async () => {

    debugger
    // const data = new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')

    const files = readdirSync(ASSETS_PATH + '/algorithms')

    for (const file of files)
        new UZip(ASSETS_PATH + '/algorithms' + '/' + file).testArchiveSync()

    debugger
    debugger
    debugger
    debugger
})()

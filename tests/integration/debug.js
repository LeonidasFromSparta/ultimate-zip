import UZip from './../../src/index'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

import {readdirSync} from 'fs'

;
(async () => {


    const keke = new UZip(ASSETS_PATH + '/algorithms/win-7z-64w.zip')
        .getEntriesSync()
    debugger
    debugger
    debugger
    debugger
})()

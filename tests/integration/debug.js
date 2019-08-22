import UZip from './../../src/index'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

import {readdirSync} from 'fs'

;
(async () => {

    debugger
    const zipPath = ASSETS_PATH + '/algorithms/win-7z-normal.zip'
    const uzip = new UZip(zipPath)

    const promise = new Promise((resolve, reject) =>
        uzip.extractByRegex(EXTRACT_PATH + '/regex/callback', /.*new.*/, (err) =>
            err ? reject(err) : resolve('ok'))) 

    await promise
    debugger
    debugger
    debugger
    debugger
})()

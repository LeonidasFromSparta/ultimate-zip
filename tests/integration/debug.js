import {ArkaivSync} from './../../src/index'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

;
(async () => {

    debugger
    // const keke = new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').
    new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').testArchiveSync()
})()

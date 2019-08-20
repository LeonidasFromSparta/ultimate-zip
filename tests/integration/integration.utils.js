import {existsSync, readdirSync, lstatSync, rmdirSync, unlinkSync} from 'fs'

const delSync = (path) => {

    if (existsSync(path)) {

        readdirSync(path).forEach((file) => {

            const curPath = path + '/' + file

            if (lstatSync(curPath).isDirectory())
                delSync(curPath)
            else
                unlinkSync(curPath)
        })

        rmdirSync(path)
    }
}

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

export {delSync, ASSETS_PATH, EXTRACT_PATH}

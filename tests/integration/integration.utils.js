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

export default delSync

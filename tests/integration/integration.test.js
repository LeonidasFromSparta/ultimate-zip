import UZip from 'u-zip'
import fs from 'fs'

const delSync = (path) => {

    if (fs.existsSync(path)) {

        fs.readdirSync(path).forEach((file) => {

            const curPath = path + "/" + file

            if (fs.lstatSync(curPath).isDirectory())
                delSync(curPath)
            else
                fs.unlinkSync(curPath)
        })

        fs.rmdirSync(path)
    }
}

afterEach(() => {
    delSync('./tests/integration/assets/extracted')
})

describe('Integration testing #1', () => {

    it('should assert sync extract', () => {

        new UZip('./tests/integration/assets/win-7z-store.zip').extractArchiveSync('./tests/integration/assets/extracted/win-7z-store')
    })
})

describe('Integration testing #2', () => {

    it('should assert sync extract', () => {

        new UZip('./tests/integration/assets/win-7z-fast.zip').extractArchiveSync('./tests/integration/assets/extracted/win-7z-fast')
    })
})

describe('Integration testing #3', () => {

    it('should assert sync extract', () => {

        new UZip('./tests/integration/assets/win-7z-fastest.zip').extractArchiveSync('./tests/integration/assets/extracted/win-7z-fastest')
    })
})

describe('Integration testing #4', () => {

    it('should assert sync extract', () => {

        new UZip('./tests/integration/assets/win-7z-normal.zip').extractArchiveSync('./tests/integration/assets/extracted/win-7z-normal')
    })
})

describe('Integration testing #5', () => {

    it('should assert sync extract', () => {

        new UZip('./tests/integration/assets/win-7z-maximum.zip').extractArchiveSync('./tests/integration/assets/extracted/win-7z-maximum')
    })
})

describe('Integration testing #6', () => {

    it('should assert sync extract', () => {

        new UZip('./tests/integration/assets/win-7z-ultra.zip').extractArchiveSync('./tests/integration/assets/extracted/win-7z-ultra')
    })
})

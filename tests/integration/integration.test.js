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

beforeEach(() => {
    delSync('./tests/integration/assets/extracted')
})

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

describe('Integration testing #7', () => {

    it('should assert sync extract', () => {

        // new UZip('./tests/integration/assets/1/1.zip').extractArchiveSync('./tests/integration/assets/extracted/1')
        new UZip('./tests/integration/assets/1/2.zip').extractArchiveSync('./tests/integration/assets/extracted/2')
        new UZip('./tests/integration/assets/1/3.zip').extractArchiveSync('./tests/integration/assets/extracted/3')
        new UZip('./tests/integration/assets/1/4.zip').extractArchiveSync('./tests/integration/assets/extracted/4')
        new UZip('./tests/integration/assets/1/5.zip').extractArchiveSync('./tests/integration/assets/extracted/5')
        // new UZip('./tests/integration/assets/1/6.zip').extractArchiveSync('./tests/integration/assets/extracted/6')
        new UZip('./tests/integration/assets/1/7.zip').extractArchiveSync('./tests/integration/assets/extracted/7')
        new UZip('./tests/integration/assets/1/8.zip').extractArchiveSync('./tests/integration/assets/extracted/8')
        new UZip('./tests/integration/assets/1/9.zip').extractArchiveSync('./tests/integration/assets/extracted/9')
        // new UZip('./tests/integration/assets/1/10.zip').extractArchiveSync('./tests/integration/assets/extracted/10')
        // new UZip('./tests/integration/assets/1/11.zip').extractArchiveSync('./tests/integration/assets/extracted/11')
        // new UZip('./tests/integration/assets/1/12.zip').extractArchiveSync('./tests/integration/assets/extracted/12')
    })
})

describe('Integration testing #7', () => {

    it('should assert sync extract', () => {

        const uzip = require('')
        new UZip('./tests/integration/assets/1/2.zip').extractArchiveSync('./tests/integration/assets/extracted/2')

    })
})

import UZip from 'u-zip'
import {delSync, EXTRACT_PATH, ASSETS_PATH} from './integration.utils'

beforeAll(() => {
    delSync(EXTRACT_PATH + '/promise')
})

describe('Integration testing promise APIs', () => {

    it('should assert promise extractArchive API', async () => {

    })

    /*
    it('should assert promise extractArchive API', async () => {

        await new UZip(ASSETS_PATH + '/win-7z-store.zip')
            .extractArchive(EXTRACT_PATH + '/promise/win-7z-store')

        await new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            .extractArchive(EXTRACT_PATH + '/promise/win-7z-fast')

        await new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            .extractArchive(EXTRACT_PATH + '/promise/win-7z-fastest')

        await new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            .extractArchive(EXTRACT_PATH + '/promise/win-7z-normal')

        await new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            .extractArchive(EXTRACT_PATH + '/promise/win-7z-maximum')

        await new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            .extractArchive(EXTRACT_PATH + '/promise/win-7z-ultra')
    })

    it('should assert promise testArchive API', async () => {

        await new UZip(ASSETS_PATH + '/win-7z-store.zip')
            .testArchive()

        await new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            .testArchive()

        await new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            .testArchive()

        await new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            .testArchive()

        await new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            .testArchive()

        await new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            .testArchive()
    })

    it('should assert promise getEntries API', async () => {

        await new UZip(ASSETS_PATH + '/win-7z-store.zip')
            .getEntries()

        await new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            .getEntries()

        await new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            .getEntries()

        await new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            .getEntries()

        await new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            .getEntries()

        await new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            .getEntries()
    })
    */
})

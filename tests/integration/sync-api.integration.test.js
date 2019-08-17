import UZip from 'u-zip'
import {delSync, ASSETS_PATH, EXTRACT_PATH} from './integration.utils'

beforeAll(() => {
    delSync(EXTRACT_PATH + '/sync')
})

describe('Integration testing sync APIs', () => {

    it('should assert extractArchiveSync API', () => {

        new UZip(ASSETS_PATH + '/win-7z-store.zip')
            .extractArchiveSync(EXTRACT_PATH + '/sync/win-7z-store')

        new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            .extractArchiveSync(EXTRACT_PATH + '/sync/win-7z-fast')

        new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            .extractArchiveSync(EXTRACT_PATH + '/sync/win-7z-fastest')

        new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            .extractArchiveSync(EXTRACT_PATH + '/sync/win-7z-normal')

        new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            .extractArchiveSync(EXTRACT_PATH + '/sync/win-7z-maximum')

        new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            .extractArchiveSync(EXTRACT_PATH + '/sync/win-7z-ultra')
    })

    it('should assert testArchiveSync API', () => {

        new UZip(ASSETS_PATH + '/win-7z-store.zip')
            .testArchiveSync()

        new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            .testArchiveSync()

        new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            .testArchiveSync()

        new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            .testArchiveSync()

        new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            .testArchiveSync()

        new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            .testArchiveSync()
    })

    it('should assert getEntriesSync API', () => {

        new UZip(ASSETS_PATH + '/win-7z-store.zip')
            .getEntriesSync()

        new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            .getEntriesSync()

        new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            .getEntriesSync()

        new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            .getEntriesSync()

        new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            .getEntriesSync()

        new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            .getEntriesSync()
    })
})

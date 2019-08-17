import UZip from 'u-zip'
import delSync from './integration.utils'

beforeAll(() => {
    delSync('./tests/integration/assets/extracted/extractArchiveSync')
})

describe('Integration testing sync APIs', () => {

    it('should assert extractArchiveSync API', () => {

        new UZip('./tests/integration/assets/win-7z-store.zip').extractArchiveSync('./tests/integration/assets/extracted/extractArchiveSync/win-7z-store')
        new UZip('./tests/integration/assets/win-7z-fast.zip').extractArchiveSync('./tests/integration/assets/extracted/extractArchiveSync/win-7z-fast')
        new UZip('./tests/integration/assets/win-7z-fastest.zip').extractArchiveSync('./tests/integration/assets/extracted/extractArchiveSync/win-7z-fastest')
        new UZip('./tests/integration/assets/win-7z-normal.zip').extractArchiveSync('./tests/integration/assets/extracted/extractArchiveSync/win-7z-normal')
        new UZip('./tests/integration/assets/win-7z-maximum.zip').extractArchiveSync('./tests/integration/assets/extracted/extractArchiveSync/win-7z-maximum')
        new UZip('./tests/integration/assets/win-7z-ultra.zip').extractArchiveSync('./tests/integration/assets/extracted/extractArchiveSync/win-7z-ultra')
    })

    it('should assert testArchiveSync API', () => {

        new UZip('./tests/integration/assets/win-7z-store.zip').testArchiveSync()
        new UZip('./tests/integration/assets/win-7z-fast.zip').testArchiveSync()
        new UZip('./tests/integration/assets/win-7z-fastest.zip').testArchiveSync()
        new UZip('./tests/integration/assets/win-7z-normal.zip').testArchiveSync()
        new UZip('./tests/integration/assets/win-7z-maximum.zip').testArchiveSync()
        new UZip('./tests/integration/assets/win-7z-ultra.zip').testArchiveSync()
    })

    it('should assert getEntriesSync API', () => {

        new UZip('./tests/integration/assets/win-7z-store.zip').getEntriesSync()
        new UZip('./tests/integration/assets/win-7z-fast.zip').getEntriesSync()
        new UZip('./tests/integration/assets/win-7z-fastest.zip').getEntriesSync()
        new UZip('./tests/integration/assets/win-7z-normal.zip').getEntriesSync()
        new UZip('./tests/integration/assets/win-7z-maximum.zip').getEntriesSync()
        new UZip('./tests/integration/assets/win-7z-ultra.zip').getEntriesSync()
    })
})

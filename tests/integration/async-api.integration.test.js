import UZip from 'u-zip'
import delSync from './integration.utils'

beforeAll(() => {
    delSync('./tests/integration/assets/extracted/extractArchive')
})

describe('Integration testing async APIs', () => {

    it('should assert async extractArchive API', async () => {

        await new UZip('./tests/integration/assets/win-7z-store.zip').extractArchive('./tests/integration/assets/extracted/extractArchive/win-7z-store')
        await new UZip('./tests/integration/assets/win-7z-fast.zip').extractArchive('./tests/integration/assets/extracted/extractArchive/win-7z-fast')
        await new UZip('./tests/integration/assets/win-7z-fastest.zip').extractArchive('./tests/integration/assets/extracted/extractArchive/win-7z-fastest')
        await new UZip('./tests/integration/assets/win-7z-normal.zip').extractArchive('./tests/integration/assets/extracted/extractArchive/win-7z-normal')
        await new UZip('./tests/integration/assets/win-7z-maximum.zip').extractArchive('./tests/integration/assets/extracted/extractArchive/win-7z-maximum')
        await new UZip('./tests/integration/assets/win-7z-ultra.zip').extractArchive('./tests/integration/assets/extracted/extractArchive/win-7z-ultra')
    })

    it('should assert async testArchive API', async () => {

        await new UZip('./tests/integration/assets/win-7z-store.zip').testArchive()
        await new UZip('./tests/integration/assets/win-7z-fast.zip').testArchive()
        await new UZip('./tests/integration/assets/win-7z-fastest.zip').testArchive()
        await new UZip('./tests/integration/assets/win-7z-normal.zip').testArchive()
        await new UZip('./tests/integration/assets/win-7z-maximum.zip').testArchive()
        await new UZip('./tests/integration/assets/win-7z-ultra.zip').testArchive()
    })

    it('should assert async getEntries API', async () => {

        await new UZip('./tests/integration/assets/win-7z-store.zip').getEntries()
        await new UZip('./tests/integration/assets/win-7z-fast.zip').getEntries()
        await new UZip('./tests/integration/assets/win-7z-fastest.zip').getEntries()
        await new UZip('./tests/integration/assets/win-7z-normal.zip').getEntries()
        await new UZip('./tests/integration/assets/win-7z-maximum.zip').getEntries()
        await new UZip('./tests/integration/assets/win-7z-ultra.zip').getEntries()
    })
})

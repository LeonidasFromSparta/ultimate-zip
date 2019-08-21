import UZip from 'u-zip'
import {readdirSync} from 'fs'
import rimraf from 'rimraf'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

beforeAll(() => {

   rimraf.sync(EXTRACT_PATH + '/zip/sync')
   rimraf.sync(EXTRACT_PATH + '/zip/promise')
   rimraf.sync(EXTRACT_PATH + '/zip/callback')

   rimraf.sync(EXTRACT_PATH + '/entry/sync')
   rimraf.sync(EXTRACT_PATH + '/entry/promise')
   rimraf.sync(EXTRACT_PATH + '/entry/callback')
})

test('integration test should assert inflate algorithms', async () => {

    const files = readdirSync(ASSETS_PATH + '/algorithms')

    for (const file of files)
        new UZip(ASSETS_PATH + '/algorithms' + '/' + file).testArchiveSync()

    for (const file of files)
        await new UZip(ASSETS_PATH + '/algorithms' + '/' + file).testArchive()

    for (const file of files)
        await new Promise((resolve, reject) => {

            new UZip(ASSETS_PATH + '/algorithms' + '/' + file)
                .testArchive((err) => err ? reject(err) : resolve())
        })
})

test('integration test should assert extract archive - sync api', () => {

    new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip').extractArchiveSync(EXTRACT_PATH + '/zip/sync')
})

test('integration test should assert extract archive - promise api', async () => {

    await new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip').extractArchive(EXTRACT_PATH + '/zip/promise')
})

test('integration test should assert extract archive callback api', async () => {

    await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .extractArchive(EXTRACT_PATH + '/zip/callback', (err) => err ? reject(err) : resolve())
    })
})

test('integration test should assert get entries - sync api', () => {

    new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip').getEntries()
})

test('integration test should assert get entries - promise api', async () => {

    await new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip').getEntries()
})

test('integration test should assert get entries - callback api', async () => {

    await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .getEntries((err, entries) => err ? reject(err) : resolve(entries))
    })
})

test('integration test should assert extract entry - sync api', () => {

    new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
        .getEntriesSync()[4].extractSync(EXTRACT_PATH + '/entry/sync')
})

test('integration test should assert extract entry - promise api', async () => {

    (await new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
        .getEntries())[4].extract(EXTRACT_PATH + '/entry/promise')
})

test('integration test should assert extract entry - callback api', async () => {

    const entries = await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .getEntries((err, entries) => err ? reject(err) : resolve(entries))
    })

    await new Promise((resolve, reject) => {

        entries[4].extract(EXTRACT_PATH + '/entry/callback', (err) => err ? reject(err) : resolve())
    })
})

test('integration test should assert get as buffer entry - sync api', () => {

    new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
        .getEntriesSync()[4].getAsBufferSync()
})

test('integration test should assert get as buffer entry - promise api', async () => {

    const entries = await new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip').getEntries()
    await entries[4].getAsBuffer()
})

test('integration test should assert get as buffer entry - callback api', async () => {

    const entries = await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .getEntries((err, entries) => err ? reject(err) : resolve(entries))
    })

    await new Promise((resolve, reject) => {

        entries[10].getAsBuffer((err, buffer) => err ? reject(err) : resolve(buffer))
    })
})

test('integration test should assert test entry - sync api', () => {

    new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
        .getEntriesSync()[4].test()
})

test('integration test should assert test entry - promise api', async () => {

    (await new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
        .getEntries())[4].test()
})

test('integration test should assert test entry - callback api', async () => {

    const entries = await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .getEntries((err, entries) => err ? reject(err) : resolve(entries))
    })

    await new Promise((resolve, reject) => {

        entries[4].test((err) => err ? reject(err) : resolve())
    })
})

test('integration test should assert get as stream entry - promise api', async () => {

    const entries = await new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip').getEntries()
    await entries[10].getAsStream()
})
test('integration test should assert get as stream entry - callback api', async () => {

    const entries = await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .getEntries((err, entries) => err ? reject(err) : resolve(entries))
    })

    await new Promise((resolve, reject) => {

        entries[10].getAsStream((err, stream) => err ? reject(err) : resolve(stream))
    })
})

/**
 * ERROR TESTS
 */

/*
test('integration test should error on bad local header signature', () => {

    const files = fs.readdirSync(ASSETS_PATH + '/bad loc sig')

    for (const file of files)
        expect(() => new UZip(ASSETS_PATH + '/bad loc sig' + '/' + file).testArchiveSync()).toThrow()
})
*/

test('integration test should error on bad central header signature', () => {

    const files = readdirSync(ASSETS_PATH + '/bad cen sig')

    for (const file of files)
        expect(() => new UZip(ASSETS_PATH + '/bad cen sig' + '/' + file).testArchiveSync()).toThrow()
})

test('integration testing arch with comment - will error on bad zip32 header signature', () => {

    const path = ASSETS_PATH + '/no comment arch - bad zip32 sig'
    const files = readdirSync(path)

    for (const file of files)
        expect(() => new UZip(path + '/' + file).testArchiveSync()).toThrow()
})

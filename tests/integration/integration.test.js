import UZip from 'u-zip'
import fs from 'fs'
import {ASSETS_PATH, EXTRACT_PATH, delSync} from './integration.utils'

beforeAll(() => {
    delSync(EXTRACT_PATH + '/zip/sync')
    delSync(EXTRACT_PATH + '/zip/promise')
    delSync(EXTRACT_PATH + '/zip/callback')

    delSync(EXTRACT_PATH + '/entry/sync')
    delSync(EXTRACT_PATH + '/entry/promise')
    delSync(EXTRACT_PATH + '/entry/callback')
})

test('integration test should assert inflate algorithms', async () => {

    const files = fs.readdirSync(ASSETS_PATH + '/algorithms')

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

    (await new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
        .getEntries())[4].getAsBuffer()
})

test('integration test should assert get as buffer entry - callback api', async () => {

    const entries = await new Promise((resolve, reject) => {

        new UZip(ASSETS_PATH + '/algorithms/win-7z-normal.zip')
            .getEntries((err, entries) => err ? reject(err) : resolve(entries))
    })

    await new Promise((resolve, reject) => {

        entries[4].getAsBuffer((err, buffer) => err ? reject(err) : resolve(buffer))
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

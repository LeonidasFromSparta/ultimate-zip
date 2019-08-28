import {ArkaivSync} from 'index'
import {readdirSync} from 'fs'
import rimraf from 'rimraf'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

beforeAll(() => {

   rimraf.sync(EXTRACT_PATH)
})

test('integration test should assert test archive api', async () => {

    new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').testArchiveSync()
})

test('integration test should assert extract archive api', async () => {

    new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').extractArchiveSync(EXTRACT_PATH + '/zip/sync')
})

test('integration test should assert extract by regex api', async () => {

    new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').extractByRegexSync(EXTRACT_PATH + '/zip/sync-regex', /.*/)
})

test('integration test should assert get entries api', async () => {

    const entries = new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').getEntriesSync()
    expect(entries.length).not.toBe(0)
})

test('integration test should assert test entry api', async () => {

    const entries = new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').getEntriesSync()
    entries[0].testSync()
})

test('integration test should assert extract entry api', async () => {

    const entries = new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').getEntriesSync()
    entries[0].extractSync(EXTRACT_PATH + '/entry/sync')
})

test('integration test should assert entry get buffer api', async () => {

    const entries = new ArkaivSync(ASSETS_PATH + '/algorithms/win-7z-64w.zip').getEntriesSync()
    entries[1].getAsBufferSync()
})

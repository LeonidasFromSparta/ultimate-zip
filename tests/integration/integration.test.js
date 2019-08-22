import UZip from 'index'
import File from 'file'
import {readdirSync} from 'fs'
import rimraf from 'rimraf'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

beforeAll(() => {

   rimraf.sync(EXTRACT_PATH)
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

test('integration testing bad checksum err', () => {

    const path = ASSETS_PATH + '/bad checksum'
    const files = readdirSync(path)

    for (const file of files)
    expect(() => new UZip(path + '/' + file).testArchiveSync()).toThrow()
})

test('integration testing file system errors - open same file twice', async () => {

    const path = ASSETS_PATH + '/testing file.txt'
    const file1 = new File(path)

    file1.openSync()
    expect(() => file1.openSync()).toThrow()

    const file2 = new File(path)

    await file2.open()
    await expect(file2.open()).rejects.toThrow()
})

test('integration testing file system errors - close no file', async () => {

    const path = ASSETS_PATH + '/testing file.txt'
    const file1 = new File(path)

    expect(() => file1.closeSync()).toThrow()

    const file2 = new File(path)

    await expect(file2.close()).rejects.toThrow()
})

test('integration testing file system errors - access no file', async () => {

    const path = ASSETS_PATH + '/testing file.txt'
    const file = new File(path)

    expect(() => file.readSync()).toThrow()
    await expect(file.read()).rejects.toThrow()

    expect(() => file.readSync()).toThrow()
    await expect(file.read()).rejects.toThrow()

    expect(() => file.getFileSizeSync()).toThrow()
    await expect(file.getFileSize()).rejects.toThrow()
})


test('integration extract archive callback api checksum error', async () => {

    const badChecksumZipPath = ASSETS_PATH + '/bad checksum/bad checksum.zip'
    await new Promise((resolve) =>
        new UZip(badChecksumZipPath)
        .extractArchive(EXTRACT_PATH + '/bad checksum/callback', (err) => {

            expect(err).toBeInstanceOf(Error)
            resolve()
        }))
})

test('integration extract archive promise api checksum error', async () => {

    const badChecksumZipPath = ASSETS_PATH + '/bad checksum/bad checksum.zip'
    await expect(new UZip(badChecksumZipPath)
        .extractArchive(EXTRACT_PATH + '/bad checksum/callback')).rejects.toThrow()
})

test('integration extract archive sync api checksum error', () => {

    const badChecksumZipPath = ASSETS_PATH + '/bad checksum/bad checksum.zip'
    expect(() => new UZip(badChecksumZipPath)
        .extractArchiveSync(EXTRACT_PATH + '/bad checksum/callback')).toThrow()
})


test('integration test archive callback api checksum error', async () => {

    const badChecksumZipPath = ASSETS_PATH + '/bad checksum/bad checksum.zip'

    await new Promise((resolve) =>
        new UZip(badChecksumZipPath).testArchive((err) => {

            expect(err).toBeInstanceOf(Error)
            resolve()
        }))
})

test('integration test archive promise api checksum error', async () => {

    const badChecksumZipPath = ASSETS_PATH + '/bad checksum/bad checksum.zip'
    await expect(new UZip(badChecksumZipPath).testArchive()).rejects.toThrow()
})

test('integration test archive sync api checksum error', () => {

    const badChecksumZipPath = ASSETS_PATH + '/bad checksum/bad checksum.zip'
    expect(() => new UZip(badChecksumZipPath).testArchiveSync()).toThrow()
})


test('integration get entries cached callback api', async () => {

    const zipPath = ASSETS_PATH + '/algorithms/win-7z-normal.zip'
    const uzip = new UZip(zipPath)

    await new Promise((resolve) =>
        uzip.testArchive(() =>
            uzip.getEntries((err, entries) => {

                expect(entries.length).not.toBe(0)
                resolve()
            })))
})

test('integration get entries cached promise api', async () => {

    const zipPath = ASSETS_PATH + '/algorithms/win-7z-normal.zip'
    const uzip = new UZip(zipPath)

    await uzip.testArchive()
    const entries = await uzip.getEntries()
    await expect(entries.length).not.toBe(0)
})

test('integration get entries cached sync api', () => {

    const zipPath = ASSETS_PATH + '/algorithms/win-7z-normal.zip'
    const uzip = new UZip(zipPath)

    uzip.testArchiveSync()
    const entries = uzip.getEntriesSync()
    expect(entries.length).not.toBe(0)
})


test('integration extract by regex callback api', async () => {

    const zipPath = ASSETS_PATH + '/algorithms/win-7z-normal.zip'
    const uzip = new UZip(zipPath)

    const promise = new Promise((resolve, reject) =>
        uzip.extractByRegex(EXTRACT_PATH + '/regex/callback', /.*new.*/, (err) =>
            err ? reject(err) : resolve('ok'))) 

    await expect(promise).resolves.toBe('ok')
})

test('integration extract by regex promise api', async () => {

    const zipPath = ASSETS_PATH + '/algorithms/win-7z-normal.zip'
    const uzip = new UZip(zipPath)

    const promise = uzip.extractByRegex(EXTRACT_PATH + '/regex/promise', /.*new.*/)
    await expect(promise).resolves.not.toThrow()
})

test('integration extract by regex sync api', async () => {

    const zipPath = ASSETS_PATH + '/algorithms/win-7z-normal.zip'
    const uzip = new UZip(zipPath)

    expect(() => uzip.extractByRegexSync(EXTRACT_PATH + '/regex/promise', /.*new.*/)).not.toThrow()
})

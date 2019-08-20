import UZip from 'u-zip'
import {delSync, EXTRACT_PATH, ASSETS_PATH} from './integration.utils'

beforeAll(() => {
    delSync(EXTRACT_PATH + '/callback')
})

describe('Integration testing callback APIs', () => {

    it('should assert callback testArchive', async () => {

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-store.zip')
            uzip.testArchive((err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            uzip.testArchive((err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            uzip.testArchive((err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            uzip.testArchive((err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            uzip.testArchive((err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            uzip.testArchive((err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })
    })

    it('should assert callback extractArchive', async () => {

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-store.zip')
            uzip.extractArchive(EXTRACT_PATH + '/callback/win-7z-store', (err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            uzip.extractArchive(EXTRACT_PATH + '/callback/win-7z-fast', (err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            uzip.extractArchive(EXTRACT_PATH + '/callback/win-7z-fastest', (err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            uzip.extractArchive(EXTRACT_PATH + '/callback/win-7z-normal', (err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            uzip.extractArchive(EXTRACT_PATH + '/callback/win-7z-maximum', (err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            uzip.extractArchive(EXTRACT_PATH + '/callback/win-7z-ultra', (err) => {

                if (err)
                    return reject(err)

                resolve()
            })
        })
    })

    it('should assert callback getEntries', async () => {

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-store.zip')
            uzip.getEntries((err, entries) => {

                if (err)
                    return reject(err)

                resolve(entries)
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-fast.zip')
            uzip.getEntries((err, entries) => {

                if (err)
                    return reject(err)

                resolve(entries)
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-fastest.zip')
            uzip.getEntries((err, entries) => {

                if (err)
                    return reject(err)

                resolve(entries)
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-normal.zip')
            uzip.getEntries((err, entries) => {

                if (err)
                    return reject(err)

                resolve(entries)
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-maximum.zip')
            uzip.getEntries((err, entries) => {

                if (err)
                    return reject(err)

                resolve(entries)
            })
        })

        await new Promise((resolve, reject) => {

            const uzip = new UZip(ASSETS_PATH + '/win-7z-ultra.zip')
            uzip.getEntries((err, entries) => {

                if (err)
                    return reject(err)

                resolve(entries)
            })
        })
    })
})

import {open, close} from 'promisifed-fs'
import {openSync, closeSync} from 'fs'
import File from 'file'

jest.mock('fs')
jest.mock('promisifed-fs')

afterEach(() => {
    open.mockClear()
    openSync.mockClear()
    close.mockClear()
    closeSync.mockClear()
})

describe('Unit testing file.js', () => {

    it('should assert open method', async () => {

        open.mockImplementation(() => Promise.resolve(1))

        const file = new File()
        await file.open()
        await expect(file.open()).rejects.toThrow()
    })

    it('should assert openSync method', () => {

        openSync.mockImplementation(() => 1)

        const file = new File()
        file.openSync()
        expect(() => file.openSync()).toThrow()
    })

    it('should assert close method', async () => {

        open.mockImplementation(() => Promise.resolve(1))
        close.mockImplementation(() => Promise.resolve())

        const file = new File()
        await file.open()
        await file.close()
        await expect(file.close()).rejects.toThrow()
    })

    it('should assert closeSync method', () => {

        openSync.mockImplementation(() => 1)
        closeSync.mockImplementation(() => undefined)

        const file = new File()
        file.openSync()
        file.closeSync()
        expect(() => file.closeSync()).toThrow()
    })
})

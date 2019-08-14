import {deflateRawSync} from 'zlib'
import * as inflater from './../src/inflater'

describe('Testing inflater.js #1 __private__.compareChecksum method', () => {

    it('should assert compareChecksum method does throw Bad Checksum Err', () => {

        expect(() => inflater.__private__.compareChecksum(0x1, 0x5)).toThrow('Bad Checksum Err')
    })

    it('should assert compareChecksum method does pass', () => {

        expect(inflater.__private__.compareChecksum(0x1, 0x1)).toBe(undefined)
    })
})

describe('Testing inflater.js #2 bufferedInflater method', () => {

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    const bufferInputStr = Buffer.from('lorem ipsum dolor sit amet')
    const deflated = deflateRawSync(bufferInputStr)
    const badDeflated = Buffer.from([1, 2, 3])

    it('should assert bufferedInflater method does throw exception on bad deflated', async () => {

        jest.spyOn(inflater.__private__, 'compareChecksum').mockImplementation(() => true)
        const header = {isDeflated: () => true}
        await expect(inflater.bufferedInflater(header, badDeflated)).rejects.toThrow()

    })

    it('should assert bufferedInflater method does decompress deflated', async () => {

        jest.spyOn(inflater.__private__, 'compareChecksum').mockImplementation(() => true)
        const header = {isDeflated: () => true}
        await expect(inflater.bufferedInflater(header, deflated)).resolves.toStrictEqual(bufferInputStr)
    })

    it('should assert bufferedInflater method does not decompress deflated', async () => {

        jest.spyOn(inflater.__private__, 'compareChecksum').mockImplementation(() => true)
        const header = {isDeflated: () => false}
        await expect(inflater.bufferedInflater(header, bufferInputStr)).resolves.toStrictEqual(bufferInputStr)
    })
})

describe('Testing inflater.js #3 inflaterSync method', () => {

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    const bufferInputStr = Buffer.from('lorem ipsum dolor sit amet')
    const deflated = deflateRawSync(bufferInputStr)
    const badDeflated = Buffer.from([1, 2, 3])

    it('should assert inflaterSync method does throw exception on bad deflated', () => {

        jest.spyOn(inflater.__private__, 'compareChecksum').mockImplementation(() => true)
        const header = {isDeflated: () => true}
        expect(() => inflater.inflaterSync(header, badDeflated)).toThrow()
    })

    it('should assert inflaterSync method does decompress deflated', () => {

        jest.spyOn(inflater.__private__, 'compareChecksum').mockImplementation(() => true)
        const header = {isDeflated: () => true}
        expect(inflater.inflaterSync(header, deflated)).toStrictEqual(bufferInputStr)
    })

    it('should assert inflaterSync method does not decompress deflated', () => {

        jest.spyOn(inflater.__private__, 'compareChecksum').mockImplementation(() => true)
        const header = {isDeflated: () => false}
        expect(inflater.inflaterSync(header, bufferInputStr)).toStrictEqual(bufferInputStr)
    })
})

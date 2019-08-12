import {deflateRawSync} from 'zlib'
import * as inflater from '../src/inflater'

describe('Testing inflater.js', () => {

    const inputStr = 'lorem ipsum dolor sit amet'
    const bufferInputStr = Buffer.from(inputStr)
    const checksum = 0xD0FC64D0
    const deflated = deflateRawSync(bufferInputStr)
    const badDeflated = Buffer.from([1, 2, 3])

    it('should assert bufferedInflater method does throw exception on bad deflated', async () => {

        const header = {}
        header.isDeflated = () => true

        await expect(inflater.bufferedInflater(header, badDeflated)).rejects.toThrow()
    })

    it('should assert bufferedInflater method does decompress deflated', async () => {

        const header = {checksum}
        header.isDeflated = () => true

        await expect(inflater.bufferedInflater(header, deflated)).resolves.toStrictEqual(bufferInputStr)
    })

    it('should assert bufferedInflater method does return the original inflated if no compression was applied', async () => {

        const header = {checksum}
        header.isDeflated = () => false

        await expect(inflater.bufferedInflater(header, bufferInputStr)).resolves.toStrictEqual(bufferInputStr)
    })

    it('should assert bufferedInflater method does throw on bad checksum', async () => {

        const header = {checksum: 'wow'}
        header.isDeflated = () => false

        return expect(inflater.bufferedInflater(header, bufferInputStr)).rejects.toMatch('bad file checksum')
    })
})

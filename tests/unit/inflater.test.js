import {deflateRawSync} from 'zlib'
import * as inflater from 'inflater'

describe('Unit testing inflater.js', () => {

    const buffer = Buffer.from('lorem ipsum dolor sit amet')
    const checksum = 0xD0FC64D0

    it('should assert inflaterSync method', () => {

        expect(inflater.inflaterSync(true, deflateRawSync(buffer), checksum)).toStrictEqual(buffer)
        expect(inflater.inflaterSync(false, buffer, checksum)).toStrictEqual(buffer)
    })

    it('should assert bufferedInflater method', async () => {

        await expect(inflater.bufferedInflater(true, deflateRawSync(buffer), checksum)).resolves.toStrictEqual(buffer)
        await expect(inflater.bufferedInflater(false, buffer, checksum)).resolves.toStrictEqual(buffer)
    })
})

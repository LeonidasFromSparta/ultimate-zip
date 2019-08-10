import {expect} from 'chai'
import {deflateRawSync} from 'zlib'
import * as inflater from '../src/inflater'

describe('Testing inflater.js', () => {

    const inputStr = 'lorem ipsum dolor sit amet'
    const bufferInputStr = Buffer.from(inputStr)
    const checksum = 0xD0FC64D0
    const deflated = deflateRawSync(bufferInputStr)

    it('should assert inflaterSync method', () => {

        const header = {checksum}

        header.isDeflated = () => true
        expect(inflater.inflaterSync(header, deflated).toString('utf8')).to.equal(inputStr)

        header.isDeflated = () => false
        expect(inflater.inflaterSync(header, bufferInputStr).toString('utf8')).to.equal(inputStr)

        header.checksum = 0x555
        expect(() => inflater.inflaterSync(header, deflated)).to.throw()
    })

    it('should assert bufferedInflater method', async () => {

        const header = {checksum}

        header.isDeflated = () => true
        expect((await inflater.bufferedInflater(header, deflated)).toString('utf8')).to.equal(inputStr)

        header.isDeflated = () => false
        expect((await inflater.bufferedInflater(header, bufferInputStr)).toString('utf8')).to.equal(inputStr)
    })
})

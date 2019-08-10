import {expect} from 'chai'
import * as entrySync from '../src/entry-sync'

describe('Testing entry-sync.js', () => {

    const inputStr = 'lorem ipsum dolor sit amet'
    const bufferInputStr = Buffer.from(inputStr)
    const checksum = 0xD0FC64D0
    const deflated = deflateRawSync(bufferInputStr)

    it('should assert getAsBufferSync method', () => {

        const header = {isDirectory: () => true}
        expect(() => entrySync.getAsBufferSync(header)).to.throw()
    })
})

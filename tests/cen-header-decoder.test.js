import {expect} from 'chai'
import * as headers from '../src/headers'

describe('Testing cen-header-decoder.js', () => {

    it('should assert private _verifySignature method', () => {

        expect(() => headers.__private__._verifySignature(0x0, 0x1, 'bad')).to.throw('bad')
        expect(() => headers.__private__._verifySignature(0x5, 0x5, 'good')).not.to.throw('good')
    })

    it('should assert private _calculateLength method', () => {

        const data = {readUInt16LE: (pos) => pos}
        const fields = [5, 7]
        const initial = 0

        expect(headers.__private__._calculateLength(data, fields, initial)).to.equal(12)
    })

    /*
    it('should assert _verifySignature method', () => {

        const decoder = new Decoder()

        expect(() => decoder._verifySignature(0x0)).to.throw('Bad central file header signature error')
        expect(() => decoder._verifySignature(CEN_SIG)).not.to.throw()
    })

    it('should assert _copy method', () => {

        const decoder = new Decoder()

        // data source less then target
        {
            const source = [1, 1]
            const target = [0, 0, 0]

            const bytesCopied = decoder._copy(target, 0, source)

            expect(target).to.eql([1, 1, 0])
            expect(bytesCopied).to.equal(2)
        }

        // data source less then target with offset
        {
            const source = [1, 1]
            const target = [10, 0, 0, 0]

            const bytesCopied = decoder._copy(target, 1, source)

            expect(target).to.eql([10, 1, 1, 0])
            expect(bytesCopied).to.equal(2)
        }

        // data source bigger then target
        {
            const source = [1, 1, 1, 1, 1, 1, 1]
            const target = [0, 0, 0, 0]

            const bytesCopied = decoder._copy(target, 0, source)

            expect(target).to.eql([1, 1, 1, 1])
            expect(bytesCopied).to.equal(4)
        }

        // data source bigger then target with offset
        {
            const source = [1, 1, 1, 1, 1, 1, 1]
            const target = [10, 0, 0, 0]

            const bytesCopied = decoder._copy(target, 1, source)

            expect(target).to.eql([10, 1, 1, 1])
            expect(bytesCopied).to.equal(3)
        }
    })
        */
})




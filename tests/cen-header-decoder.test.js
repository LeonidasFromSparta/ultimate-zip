import {expect} from 'chai'
import Decoder from '../src/central-header-decoder'
import {CEN_SIG} from '../src/constants'

describe('Testing cen-header-decoder.js', () => {

    it('should assert _capableOfCopy method', () => {

        const decoder = new Decoder()

        decoder._capableOfCopy(0, 50, 0, 50)

        expect(decoder._capableOfCopy(0, 50, 0, 50)).to.be.true
        expect(decoder._capableOfCopy(50, 50, 0, 50)).to.be.false
        expect(decoder._capableOfCopy(100, 50, 0, 50)).to.be.false

        expect(decoder._capableOfCopy(50, 0, 0, 50)).to.be.false
        expect(decoder._capableOfCopy(50, 50, 0, 50)).to.be.false
        expect(decoder._capableOfCopy(50, 100, 0, 50)).to.be.true

        expect(decoder._capableOfCopy(0, 50, 0, 50)).to.be.true
        expect(decoder._capableOfCopy(0, 50, 50, 50)).to.be.false
        expect(decoder._capableOfCopy(0, 50, 100, 50)).to.be.false

        expect(decoder._capableOfCopy(0, 50, 50, 0)).to.be.false
        expect(decoder._capableOfCopy(0, 50, 50, 50)).to.be.false
        expect(decoder._capableOfCopy(0, 50, 50, 100)).to.be.true
    })

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
})




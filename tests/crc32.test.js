import {expect} from 'chai'
import {CRC32} from './../src/crc32'

describe('Testing crc32.js', () => {

    it('should assert crc32', () => {

        const crc32 = new CRC32()

        let text = ''

        text += 'Lorem ipsum dolor sit amet, et elitr fuisset nec, eu habeo euismod mei.\r\n'
        text += 'Ut qui nostrum accommodare, ex nam delicata iudicabit, mea id labore alienum tractatos.\r\n'
        text += 'Ad mel semper civibus, duo virtute repudiare et.\r\n'
        text += 'Mea debet integre graecis et, aliquip nominavi atomorum mei at.\r\n'
        text += 'Platonem inimicus omittantur usu id, eu sea quas abhorreant voluptatibus.\r\n'
        text += 'Est te nusquam percipitur, sed nonumes principes ea.\r\n'

        crc32.update(Buffer.from(text))
        const value = crc32.getValue()

        expect(value).to.be.equal(0x94699776)
    })
})

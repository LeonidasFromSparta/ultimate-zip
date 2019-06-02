import {Should} from 'chai'
import Crc32 from '../src/crc32'

const should = Should()

describe('Testing crc32', () => {

    it('should assert crc32', () => {

        let txt = ''

        txt += 'Lorem ipsum dolor sit amet, et elitr fuisset nec, eu habeo euismod mei.\r\n'
        txt += 'Ut qui nostrum accommodare, ex nam delicata iudicabit, mea id labore alienum tractatos.\r\n'
        txt += 'Ad mel semper civibus, duo virtute repudiare et.\r\n'
        txt += 'Mea debet integre graecis et, aliquip nominavi atomorum mei at.\r\n'
        txt += 'Platonem inimicus omittantur usu id, eu sea quas abhorreant voluptatibus.\r\n'
        txt += 'Est te nusquam percipitur, sed nonumes principes ea.\r\n'

        const buffer = Buffer.from(txt)

        Crc32(buffer).should.equal(0x94699776)
    })
})

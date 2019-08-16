import {CRC32, CRC32Stream} from './../src/crc32'
import {Readable} from 'stream'

describe('Testing crc32-stream.js', () => {

    it('should assert crc32-stream', async () => {

        const reader = new Readable()

        reader.push('Lorem ipsum dolor sit amet, et elitr fuisset nec, eu habeo euismod mei.\r\n')
        reader.push('Ut qui nostrum accommodare, ex nam delicata iudicabit, mea id labore alienum tractatos.\r\n')
        reader.push('Ad mel semper civibus, duo virtute repudiare et.\r\n')
        reader.push('Mea debet integre graecis et, aliquip nominavi atomorum mei at.\r\n')
        reader.push('Platonem inimicus omittantur usu id, eu sea quas abhorreant voluptatibus.\r\n')
        reader.push('Est te nusquam percipitur, sed nonumes principes ea.\r\n')
        reader.push(null)

        const crc32Stream = new CRC32Stream(new CRC32())

        const prom = await new Promise((resolve) => reader.pipe(crc32Stream).on('finish', () => resolve(crc32Stream.getValue())))

        expect(prom).toBe(0x94699776)
    })
})

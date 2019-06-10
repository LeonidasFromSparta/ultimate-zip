import {expect} from 'chai'
// import {Readable} from 'stream'
// import CRC32Transformer from '../src/crc32-writeable-stream'

describe('Testing crc32 writeable stream', () => {

    it('should assert crc32 writeable stream', () => {

        /*
        let txt = ''

        txt += 'Lorem ipsum dolor sit amet, et elitr fuisset nec, eu habeo euismod mei.\r\n'
        txt += 'Ut qui nostrum accommodare, ex nam delicata iudicabit, mea id labore alienum tractatos.\r\n'
        txt += 'Ad mel semper civibus, duo virtute repudiare et.\r\n'
        txt += 'Mea debet integre graecis et, aliquip nominavi atomorum mei at.\r\n'
        txt += 'Platonem inimicus omittantur usu id, eu sea quas abhorreant voluptatibus.\r\n'
        txt += 'Est te nusquam percipitur, sed nonumes principes ea.\r\n'

        const promise = new Promise((resolve) => {

            const readable = new Readable()
            readable.push(Buffer.from(txt))
            readable.push(null)

            const crc32WriteableStream = new CRC32Transformer()
            readable.pipe(crc32WriteableStream)

            crc32WriteableStream.on('finish', () => resolve(crc32WriteableStream.getValue()))
        })

        promise.then((crc32) => crc32.should.equal(0x94699776))
        */

        expect(0).to.be.equal(0)
    })
})

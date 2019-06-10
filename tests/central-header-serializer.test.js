import {expect} from 'chai'
import CentralHeaderSerializer from './../src/central-header-serializer'
import {CENTRAL_HEADER_LENGTH} from './../src/constants'

describe('Testing central-header-serializer.js', () => {

    it('will deserialize an exact chunk of bytes', () => {

        const serializer = new CentralHeaderSerializer()
        const fileName = 'my-file.js'
        const extraField = [5, 5, 5, 5, 5]
        const fileComment = 'this is a comment'

        const buffer = Buffer.alloc(CENTRAL_HEADER_LENGTH + fileName.length + extraField.length + fileComment.length)
        buffer.writeUInt32LE(serializer.signature, 0)
        buffer.writeUInt16LE(fileName.length, 28)
        buffer.writeUInt16LE(extraField.length, 30)
        buffer.writeUInt16LE(fileComment.length, 32)

        Buffer.from(fileName).copy(buffer, CENTRAL_HEADER_LENGTH, 0)
        Buffer.from(extraField).copy(buffer, CENTRAL_HEADER_LENGTH + fileName.length, 0)
        Buffer.from(fileComment).copy(buffer, CENTRAL_HEADER_LENGTH + fileName.length + extraField.length, 0)

        serializer.update(buffer)
        const header = serializer.deserealize()

        expect(header.getFileName()).to.equal(fileName)
        expect(header.getExtraField().toString()).to.equal(Buffer.from(extraField).toString())
        expect(header.getFileComment()).to.equal(fileComment)
    })

    it('will deserialize once on big chunk of bytes', () => {

        const serializer = new CentralHeaderSerializer()
        const fileName = 'my-file.js'
        const extraField = [5, 5, 5, 5, 5]
        const fileComment = 'this is a comment'

        const buffer = Buffer.alloc(CENTRAL_HEADER_LENGTH + fileName.length + extraField.length + fileComment.length)
        buffer.writeUInt32LE(serializer.signature, 0)
        buffer.writeUInt16LE(fileName.length, 28)
        buffer.writeUInt16LE(extraField.length, 30)
        buffer.writeUInt16LE(fileComment.length, 32)

        Buffer.from(fileName).copy(buffer, CENTRAL_HEADER_LENGTH, 0)
        Buffer.from(extraField).copy(buffer, CENTRAL_HEADER_LENGTH + fileName.length, 0)
        Buffer.from(fileComment).copy(buffer, CENTRAL_HEADER_LENGTH + fileName.length + extraField.length, 0)

        serializer.update(buffer)
        const header = serializer.deserealize()

        expect(header.getFileName()).to.equal(fileName)
        expect(header.getExtraField().toString()).to.equal(Buffer.from(extraField).toString())
        expect(header.getFileComment()).to.equal(fileComment)
    })

    it('will throw on bad header signature', () => {

        const serializer = new CentralHeaderSerializer()

        const buffer = Buffer.alloc(CENTRAL_HEADER_LENGTH)
        buffer.writeUInt32LE(0xffff, 0)

        serializer.update(buffer)

        expect(() => serializer.deserealize()).to.throw()
    })
})

import {expect} from 'chai'
import LocalHeader from '../src/local-header'
import {OBJECT_LOCAL_HEADER_LENGTH} from '../src/constants'
import {LOCAL_HEADER_LENGTH} from '../src/constants'

describe('Testing local header', () => {

    it('should assert VersionNeededToExtract getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setVersionNeededToExtract(5)
        const value = header.getVersionNeededToExtract()

        expect(value).to.be.equal(5)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert VersionNeededToExtract getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt8(5, 0)
        const value = header.getVersionNeededToExtract()

        expect(value).to.be.equal(5)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert VersionNeededToExtract is 1 bytes unsigned', () => {

        const centralHeader = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            centralHeader.setVersionNeededToExtract(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert PlatformNeededToExtract getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setPlatformNeededToExtract(5)
        const value = header.getPlatformNeededToExtract()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert PlatformNeededToExtract getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt8(5, 1)
        const value = header.getPlatformNeededToExtract()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert PlatformNeededToExtract is 1 bytes unsigned', () => {

        const centralHeader = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            centralHeader.setPlatformNeededToExtract(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert GeneralPurposeBitFlag getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setGeneralPurposeBitFlag(5)
        const value = header.getGeneralPurposeBitFlag()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert GeneralPurposeBitFlag getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt16LE(5, 2)
        const value = header.getGeneralPurposeBitFlag()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert GeneralPurposeBitFlag is 2 bytes unsigned', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            header.setGeneralPurposeBitFlag(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CompressionMethod getter/setter', () => {

        const centralHeader = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        centralHeader.setCompressionMethod(5)
        const value = centralHeader.getCompressionMethod()

        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert CompressionMethod getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt16LE(5, 4)
        const value = header.getCompressionMethod()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert CompressionMethod is 2 bytes unsigned', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            header.setCompressionMethod(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert LastModFileTime getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setLastModFileTime(5)
        const value = header.getLastModFileTime()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert LastModFileTime getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt16LE(5, 6)
        const value = header.getLastModFileTime()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert LastModFileTime is 2 bytes unsigned', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            header.setLastModFileTime(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert LastModFileDate getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setLastModFileDate(5)
        const value = header.getLastModFileDate()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert LastModFileDate getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt16LE(5, 8)
        const value = header.getLastModFileDate()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert LastModFileDate is 2 bytes unsigned', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            header.setLastModFileDate(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CRC32 getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setCRC32(5)
        const value = header.getCRC32()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert CRC32 getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt32LE(5, 10)
        const value = header.getCRC32()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert CRC32 is 4 bytes unsigned', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            header.setLastModFileDate(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CompressedSize getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setCompressedSize(5)
        const value = header.getCompressedSize()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert CompressedSize getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt32LE(5, 14)
        const value = header.getCompressedSize()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getUncompressedSize()).to.be.equal(0)
    })

    it('should assert CompressedSize is 4 bytes unsigned', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            header.setCompressedSize(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert UncompressedSize getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setUncompressedSize(5)
        const value = header.getUncompressedSize()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(value).to.be.equal(5)
    })

    it('should assert UncompressedSize getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH)
        const header = new LocalHeader(buffer)

        buffer.writeUInt32LE(5, 18)
        const value = header.getUncompressedSize()

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(value).to.be.equal(5)
    })

    it('should assert UncompressedSize is 4 bytes unsigned', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        try {

            header.setUncompressedSize(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert FileName getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))
        const fileName = 'my filename'

        header.setFileName(fileName)
        const value = header.getFileName()

        expect(value).to.be.equal(fileName)
    })

    it('should assert that empty string returned if FileName not set', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        const value = header.getFileName()

        expect(value).to.be.equal('')
    })

    it('should assert ExtraField getter/setter', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        header.setExtraField(Buffer.from([1, 2, 3, 4, 5]))
        const value = header.getExtraField().toString()

        expect(value).to.be.equal(Buffer.from([1, 2, 3, 4, 5]).toString())
    })

    it('should assert that empty buffer returned if ExtraField not set', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        const value = header.getExtraField().toString()

        expect(value).to.be.equal(Buffer.from([]).toString())
    })

    it('should assert HeaderLength getter with FileName, ExtraField', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))
        const fileName = 'my filename'
        const extraField = Buffer.from([1, 2, 3, 4, 5])

        header.setFileName(fileName)
        header.setExtraField(extraField)
        const value = header.getHeaderLength()

        expect(value).to.be.equal(LOCAL_HEADER_LENGTH + fileName.length + extraField.length)
    })

    it('should assert HeaderLength getter without setting FileName, ExtraField', () => {

        const header = new LocalHeader(Buffer.alloc(OBJECT_LOCAL_HEADER_LENGTH))

        const value = header.getHeaderLength()

        expect(value).to.be.equal(LOCAL_HEADER_LENGTH)
    })
})

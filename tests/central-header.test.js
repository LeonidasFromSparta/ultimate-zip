import {expect} from 'chai'
import CentralHeader from './../src/central-header'
import {OBJECT_CENTRAL_HEADER_LENGTH} from './contants'
import {CENTRAL_HEADER_LENGTH} from './contants'

describe('Testing central header', () => {

    it('should assert VersionMadeBy getter/setter', () => {

        const centralHeader = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        centralHeader.setVersionMadeBy(5)
        const value = centralHeader.getVersionMadeBy()

        expect(value).to.be.equal(5)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert VersionMadeBy getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const centralHeader = new CentralHeader(buffer)

        buffer.writeUInt8(5, 0)
        const value = centralHeader.getVersionMadeBy()

        expect(value).to.be.equal(5)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert VersionMadeBy is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            centralHeader.setVersionMadeBy(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert PlatformCompatibility getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setPlatformCompatibility(5)
        const value = header.getPlatformCompatibility()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert PlatformCompatibility getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const centralHeader = new CentralHeader(buffer)

        buffer.writeUInt8(5, 1)
        const value = centralHeader.getPlatformCompatibility()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert PlatformCompatibility is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            centralHeader.setPlatformCompatibility(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert VersionNeededToExtract getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setVersionNeededToExtract(5)
        const value = header.getVersionNeededToExtract()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert VersionNeededToExtract getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt8(5, 2)
        const value = header.getVersionNeededToExtract()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert VersionNeededToExtract is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            centralHeader.setVersionNeededToExtract(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert PlatformNeededToExtract getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setPlatformNeededToExtract(5)
        const value = header.getPlatformNeededToExtract()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert PlatformNeededToExtract getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt8(5, 3)
        const value = header.getPlatformNeededToExtract()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert PlatformNeededToExtract is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            centralHeader.setPlatformNeededToExtract(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert GeneralPurposeBitFlag getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setGeneralPurposeBitFlag(5)
        const value = header.getGeneralPurposeBitFlag()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert GeneralPurposeBitFlag getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt16LE(5, 4)
        const value = header.getGeneralPurposeBitFlag()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert GeneralPurposeBitFlag is 2 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setGeneralPurposeBitFlag(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CompressionMethod getter/setter', () => {

        const centralHeader = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        centralHeader.setCompressionMethod(5)
        const value = centralHeader.getCompressionMethod()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CompressionMethod getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt16LE(5, 6)
        const value = header.getCompressionMethod()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CompressionMethod is 2 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setCompressionMethod(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert LastModFileTime getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setLastModFileTime(5)
        const value = header.getLastModFileTime()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert LastModFileTime getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt16LE(5, 8)
        const value = header.getLastModFileTime()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert LastModFileTime is 2 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setLastModFileTime(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert LastModFileDate getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setLastModFileDate(5)
        const value = header.getLastModFileDate()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert LastModFileDate getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt16LE(5, 10)
        const value = header.getLastModFileDate()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert LastModFileDate is 2 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setLastModFileDate(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CRC32 getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setCRC32(5)
        const value = header.getCRC32()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CRC32 getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt32LE(5, 12)
        const value = header.getCRC32()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CRC32 is 4 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setLastModFileDate(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CompressedSize getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setCompressedSize(5)
        const value = header.getCompressedSize()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CompressedSize getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt32LE(5, 16)
        const value = header.getCompressedSize()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CompressedSize is 4 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setCompressedSize(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert UncompressedSize getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setUncompressedSize(5)
        const value = header.getUncompressedSize()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert UncompressedSize getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt32LE(5, 20)
        const value = header.getUncompressedSize()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert UncompressedSize is 4 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setUncompressedSize(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert DiskNumberStart getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setDiskNumberStart(5)
        const value = header.getDiskNumberStart()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert DiskNumberStart getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt16LE(5, 24)
        const value = header.getDiskNumberStart()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert DiskNumberStart is 2 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setDiskNumberStart(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert InternalFileAttributes getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setInternalFileAttributes(5)
        const value = header.getInternalFileAttributes()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert InternalFileAttributes getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt16LE(5, 26)
        const value = header.getInternalFileAttributes()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert InternalFileAttributes is 2 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setInternalFileAttributes(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert ExternalFileAttributes getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setExternalFileAttributes(5)
        const value = header.getExternalFileAttributes()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert ExternalFileAttributes getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt32LE(5, 28)
        const value = header.getExternalFileAttributes()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert ExternalFileAttributes is 4 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setExternalFileAttributes(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert OffsetOfLocalFileHeader getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setOffsetOfLocalFileHeader(5)
        const value = header.getOffsetOfLocalFileHeader()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(value).to.be.equal(5)
    })

    it('should assert OffsetOfLocalFileHeader getter by buffer', () => {

        const buffer = Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH)
        const header = new CentralHeader(buffer)

        buffer.writeUInt32LE(5, 32)
        const value = header.getOffsetOfLocalFileHeader()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(value).to.be.equal(5)
    })

    it('should assert OffsetOfLocalFileHeader is 4 bytes unsigned', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        try {

            header.setOffsetOfLocalFileHeader(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert FileName getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setFileName('my filename')
        const value = header.getFileName()

        expect(value).to.be.equal('my filename')
    })

    it('should assert that empty string returned if FileName not set', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        const value = header.getFileName()

        expect(value).to.be.equal('')
    })

    it('should assert ExtraField getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        header.setExtraField(Buffer.from([1, 2, 3, 4, 5]))
        const value = header.getExtraField().toString()

        expect(value).to.be.equal(Buffer.from([1, 2, 3, 4, 5]).toString())
    })

    it('should assert that empty buffer returned if ExtraField not set', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        const value = header.getExtraField().toString()

        expect(value).to.be.equal(Buffer.from([]).toString())
    })

    it('should assert HeaderLength getter with FileName, ExtraField, FileComment', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))
        const fileName = 'my filename'
        const extraField = Buffer.from([1, 2, 3, 4, 5])
        const fileComment = 'file comment'

        header.setFileName(fileName)
        header.setExtraField(extraField)
        header.setFileComment(fileComment)
        const value = header.getHeaderLength()

        expect(value).to.be.equal(CENTRAL_HEADER_LENGTH + fileName.length + extraField.length + fileComment.length)
    })

    it('should assert HeaderLength getter without setting FileName, ExtraField, FileComment', () => {

        const header = new CentralHeader(Buffer.alloc(OBJECT_CENTRAL_HEADER_LENGTH))

        const value = header.getHeaderLength()

        expect(value).to.be.equal(CENTRAL_HEADER_LENGTH)
    })
})

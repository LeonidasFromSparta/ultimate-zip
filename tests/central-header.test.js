import {expect} from 'chai'
import CentralHeader from './../src/central-header'
import {CEN_HDR} from './../src/constants'

describe('testing central-header.js', () => {

    it('it will check VersionMadeBy getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setVersionMadeBy(0xFF)
        const value = header.getVersionMadeBy()

        expect(value).to.be.equal(0xFF)

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
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setVersionMadeBy overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setVersionMadeBy(0xFFF)).to.throw()
    })

    it('it will check PlatformCompatibility getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setPlatformCompatibility(0xFF)
        const value = header.getPlatformCompatibility()

        expect(header.getVersionMadeBy()).to.be.equal(0)

        expect(value).to.be.equal(0xFF)

        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if PlatformCompatibility overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setPlatformCompatibility(0xFFF)).to.throw()
    })

    it('it will check VersionNeededToExtract getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setVersionNeededToExtract(0xFF)
        const value = header.getVersionNeededToExtract()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)

        expect(value).to.be.equal(0xFF)

        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setVersionNeededToExtract overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setVersionNeededToExtract(0xFFF)).to.throw()
    })

    it('it will check PlatformNeededToExtract getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setPlatformNeededToExtract(0xFF)
        const value = header.getPlatformNeededToExtract()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)

        expect(value).to.be.equal(0xFF)

        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setPlatformNeededToExtract overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setPlatformNeededToExtract(0xFFF)).to.throw()
    })

    it('it will check GeneralPurposeBitFlag getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setGeneralPurposeBitFlag(0xFFFF)
        const value = header.getGeneralPurposeBitFlag()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setGeneralPurposeBitFlag overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setGeneralPurposeBitFlag(0xFFFFF)).to.throw()
    })

    it('it will check CompressionMethod getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setCompressionMethod(0xFFFF)
        const value = header.getCompressionMethod()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setCompressionMethod overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setCompressionMethod(0xFFFFF)).to.throw()
    })

    it('it will check LastModFileTime getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setLastModFileTime(0xFFFF)
        const value = header.getLastModFileTime()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getLastModFileDate()).to.be.equal(0)
        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setLastModFileTime overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setLastModFileTime(0xFFFFF)).to.throw()
    })

    it('it will check LastModFileDate getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setLastModFileDate(0xFFFF)
        const value = header.getLastModFileDate()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getCRC32()).to.be.equal(0)
        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setLastModFileDate overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setLastModFileDate(0xFFFFF)).to.throw()
    })

    it('it will check CRC32 getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setCRC32(0xFFFFFFFF)
        const value = header.getCRC32()

        expect(header.getVersionMadeBy()).to.be.equal(0)
        expect(header.getPlatformCompatibility()).to.be.equal(0)
        expect(header.getVersionNeededToExtract()).to.be.equal(0)
        expect(header.getPlatformNeededToExtract()).to.be.equal(0)
        expect(header.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(header.getCompressionMethod()).to.be.equal(0)
        expect(header.getLastModFileTime()).to.be.equal(0)
        expect(header.getLastModFileDate()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFFFFFF)

        expect(header.getCompressedSize()).to.be.equal(0)
        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setCRC32 overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setCRC32(0xFFFFFFFFF)).to.throw()
    })

    it('it will check CompressedSize getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setCompressedSize(0xFFFFFFFF)
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

        expect(value).to.be.equal(0xFFFFFFFF)

        expect(header.getUncompressedSize()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setCompressedSize overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setCompressedSize(0xFFFFFFFFF)).to.throw()
    })

    it('will check UncompressedSize getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setUncompressedSize(0xFFFFFFFF)
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

        expect(value).to.be.equal(0xFFFFFFFF)

        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setUncompressedSize overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setUncompressedSize(0xFFFFFFFFF)).to.throw()
    })

    it('will check FileNameLength getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setFileNameLength(0xFFFF)
        const value = header.getFileNameLength()

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

        expect(value).to.be.equal(0xFFFF)

        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setFileNameLength overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setFileNameLength(0xFFFFF)).to.throw()
    })

    it('will check ExtraFieldLength getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setExtraFieldLength(0xFFFF)
        const value = header.getExtraFieldLength()

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
        expect(header.getFileNameLength()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setExtraFieldLength overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setExtraFieldLength(0xFFFFF)).to.throw()
    })







    it('will check FileCommentLength getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setFileCommentLength(0xFFFF)
        const value = header.getFileCommentLength()

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
        expect(header.getFileNameLength()).to.be.equal(0)
        expect(header.getExtraFieldLength()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setFileCommentLength overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setFileCommentLength(0xFFFFF)).to.throw()
    })

    it('will check DiskNumberStart getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setDiskNumberStart(0xFFFF)
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
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setDiskNumberStart overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setDiskNumberStart(0xFFFFF)).to.throw()
    })

    it('it will check InternalFileAttributes getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setInternalFileAttributes(0xFFFF)
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
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFF)

        expect(header.getExternalFileAttributes()).to.be.equal(0)
        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if InternalFileAttributes overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setInternalFileAttributes(0xFFFFF)).to.throw()
    })

    it('it will check ExternalFileAttributes getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setExternalFileAttributes(0xFFFFFFFF)
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
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFFFFFF)

        expect(header.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('will throw if setExternalFileAttributes overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setExternalFileAttributes(0xFFFFFFFFF)).to.throw()
    })

    it('it will check OffsetOfLocalFileHeader getter/setter', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setOffsetOfLocalFileHeader(0xFFFFFFFF)
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
        expect(header.getExtraFieldLength()).to.be.equal(0)
        expect(header.getFileCommentLength()).to.be.equal(0)
        expect(header.getDiskNumberStart()).to.be.equal(0)
        expect(header.getInternalFileAttributes()).to.be.equal(0)
        expect(header.getExternalFileAttributes()).to.be.equal(0)

        expect(value).to.be.equal(0xFFFFFFFF)
    })

    it('will throw if setOffsetOfLocalFileHeader overflow', () => {

        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        expect(() => header.setOffsetOfLocalFileHeader(0xFFFFFFFFF)).to.throw()
    })

    it('it will check FileName getter/setter', () => {

        const name = 'Lorem ipsum.txt'
        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setFileName(name)
        const value = header.getFileName()

        expect(value).to.be.equal(name)
    })

    it('it will check ExtraField getter/setter', () => {

        const buffer = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF])
        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setExtraField(buffer)
        const value = header.getExtraField().toString()

        expect(value).to.be.equal(buffer.toString())
    })

    it('it will check comment getter/setter', () => {

        const comment = 'Sumo tempor virtute ad mel, duo te lorem nonumes denique, pro eu omnis intellegat'
        const header = new CentralHeader(Buffer.alloc(CEN_HDR))

        header.setFileComment(comment)
        const value = header.getFileComment()

        expect(value).to.be.equal(comment)
    })

    it('it will check HeaderSize getter', () => {

        const name = 'Lorem ipsum.txt'
        const extra = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF])
        const comment = 'Sumo tempor virtute ad mel, duo te lorem nonumes denique, pro eu omnis intellegat'

        const header = new CentralHeader(Buffer.alloc(CEN_HDR + name.length + extra.length + comment.length))

        header.setFileName(name)
        header.setExtraField(extra)
        header.setFileComment(comment)
        const value = header.getHeaderSize()

        expect(value).to.be.equal(CEN_HDR + name.length + extra.length + comment.length)
    })
})

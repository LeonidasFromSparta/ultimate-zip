import {expect} from 'chai'
import CentralHeader from './../src/central-header'
import CentralHeaderSerializer from './../src/central-header-serializer'

describe('Testing central header', () => {

    it('should assert VersionMadeBy getter/setter', () => {

        const centralHeader = new CentralHeader()
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

    it('should assert VersionMadeBy is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setVersionMadeBy(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert PlatformCompatibility getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setPlatformCompatibility(5)
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

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setPlatformCompatibility(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert VersionNeededToExtract getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setVersionNeededToExtract(5)
        const value = centralHeader.getVersionNeededToExtract()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(value).to.be.equal(5)
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

    it('should assert VersionNeededToExtract is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setVersionNeededToExtract(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert PlatformNeededToExtract getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setPlatformNeededToExtract(5)
        const value = centralHeader.getPlatformNeededToExtract()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
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

    it('should assert PlatformNeededToExtract is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setPlatformNeededToExtract(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert GeneralPurposeBitFlag getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setGeneralPurposeBitFlag(5)
        const value = centralHeader.getGeneralPurposeBitFlag(0)

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(value).to.be.equal(5)
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

    it('should assert GeneralPurposeBitFlag is 4 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setGeneralPurposeBitFlag(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CompressionMethod getter/setter', () => {

        const centralHeader = new CentralHeader()
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

    it('should assert CompressionMethod is 1 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setCompressionMethod(300)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert LastModFileTime getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setLastModFileTime(5)
        const value = centralHeader.getLastModFileTime()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert LastModFileTime is 2 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setLastModFileTime(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert LastModFileDate getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setLastModFileDate(5)
        const value = centralHeader.getLastModFileDate()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert LastModFileDate is 2 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setLastModFileDate(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CRC32 getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setCRC32(5)
        const value = centralHeader.getCRC32()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CRC32 is 4 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setLastModFileDate(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CompressedSize getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setCompressedSize(5)
        const value = centralHeader.getCompressedSize()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getUncompressedSize()).to.be.equal(0)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert CompressedSize is 4 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setCompressedSize(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert UncompressedSize getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setUncompressedSize(5)
        const value = centralHeader.getUncompressedSize()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
        expect(centralHeader.getPlatformCompatibility()).to.be.equal(0)
        expect(centralHeader.getVersionNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getPlatformNeededToExtract()).to.be.equal(0)
        expect(centralHeader.getGeneralPurposeBitFlag()).to.be.equal(0)
        expect(centralHeader.getCompressionMethod()).to.be.equal(0)
        expect(centralHeader.getLastModFileTime()).to.be.equal(0)
        expect(centralHeader.getLastModFileDate()).to.be.equal(0)
        expect(centralHeader.getCRC32()).to.be.equal(0)
        expect(centralHeader.getCompressedSize()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(centralHeader.getDiskNumberStart()).to.be.equal(0)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert UncompressedSize is 4 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setUncompressedSize(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert DiskNumberStart getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setDiskNumberStart(5)
        const value = centralHeader.getDiskNumberStart()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
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
        expect(value).to.be.equal(5)
        expect(centralHeader.getInternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert DiskNumberStart is 2 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setDiskNumberStart(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert InternalFileAttributes getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setInternalFileAttributes(5)
        const value = centralHeader.getInternalFileAttributes()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
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
        expect(value).to.be.equal(5)
        expect(centralHeader.getExternalFileAttributes()).to.be.equal(0)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert InternalFileAttributes is 2 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setInternalFileAttributes(70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert ExternalFileAttributes getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setExternalFileAttributes(5)
        const value = centralHeader.getExternalFileAttributes()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
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
        expect(value).to.be.equal(5)
        expect(centralHeader.getOffsetOfLocalFileHeader()).to.be.equal(0)
    })

    it('should assert ExternalFileAttributes is 4 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setExternalFileAttributes(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert OffsetOfLocalFileHeader getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setOffsetOfLocalFileHeader(5)
        const value = centralHeader.getOffsetOfLocalFileHeader()

        expect(centralHeader.getVersionMadeBy()).to.be.equal(0)
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
        expect(value).to.be.equal(5)
    })

    it('should assert OffsetOfLocalFileHeader is 4 bytes unsigned', () => {

        const centralHeader = new CentralHeader()

        try {

            centralHeader.setOffsetOfLocalFileHeader(4394967296)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert FileName getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setFileName('my filename')
        const value = centralHeader.getFileName()

        expect(value).to.be.equal('my filename')
    })

    it('should assert that empty string returned when FileName not set', () => {

        const centralHeader = new CentralHeader()
        const value = centralHeader.getFileName()

        expect(value).to.be.equal('')
    })

    it('should assert ExtraField getter/setter', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setExtraField(Buffer.from([1, 2, 3, 4, 5]))
        const value = centralHeader.getExtraField().toString()

        expect(value).to.be.equal(Buffer.from([1, 2, 3, 4, 5]).toString())
    })

    it('should assert that empty buffer returned when ExtraField not set', () => {

        const centralHeader = new CentralHeader()
        const value = centralHeader.getExtraField().toString()

        expect(value).to.be.equal(Buffer.from([]).toString())
    })

    it('should assert HeaderLength getter with FileName, ExtraField, FileComment', () => {

        const centralHeader = new CentralHeader()
        centralHeader.setFileName('my filename')
        centralHeader.setExtraField(Buffer.from([1, 2, 3, 4, 5]))
        centralHeader.setFileComment('file comment')
        const value = centralHeader.getHeaderLength()

        expect(value).to.be.equal(CentralHeaderSerializer.HEADER_FIXED_LENGTH + 11 + 5 + 12)
    })

    it('should assert HeaderLength getter without setting FileName, ExtraField, FileComment', () => {

        const zip32Header = new CentralHeader()
        const value = zip32Header.getHeaderLength()

        expect(value).to.be.equal(CentralHeaderSerializer.HEADER_FIXED_LENGTH)
    })
})

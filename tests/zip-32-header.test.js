import {Should} from 'chai'
import Zip32Header from './../src/zip-32-header'

const should = Should()

describe('Testing zip 32 header', () => {

    it('should assert signature', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getSignature().should.equal(Zip32Header.SIGNATURE)
    })

    it('should assert number of the disk', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getNumberOfThisDisk().should.equal(0)
    })

    it('should assert number of disk where central directories start', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getNumberOfDiskWhereCentralDirectoriesStart().should.equal(0)
    })

    it('should assert number of central directories on this disk', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getNumberOfDiskWhereCentralDirectoriesStart().should.equal(0)
    })

    it('should assert number of central directories', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getNumberOfCentralDirectories().should.equal(3)
    })

    it('should assert size of central directories', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getSizeOfCentralDirectories().should.equal(281)
    })

    it('should assert central directories offset with starting disk', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getCentralDirectoriesOffsetWithStartingDisk().should.equal(829)
    })

    it('should assert ZIP file comment length', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getZipFileCommentLength().should.equal(0)
    })

    it('should assert ZIP file comment', () => {

        const zip32Header = new Zip32Header(Buffer.from([80, 75, 5, 6, 0, 0, 0, 0, 3, 0, 3, 0, 25, 1, 0, 0, 61, 3, 0, 0, 0, 0]))
        zip32Header.getZipFileComment().should.equal('')
    })
})

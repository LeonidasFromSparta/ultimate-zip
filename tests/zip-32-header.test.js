import {expect} from 'chai'
import Zip32Header from './../src/zip-32-header'
import Zip32HeaderSerializer from './../src/zip-32-header-serializer'

describe('Testing zip 32 header', () => {

    it('should assert NumberOfThisDisk getter/setter', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setNumberOfThisDisk(5)
        const value = zip32Header.getNumberOfThisDisk()

        expect(value).to.be.equal(5)
        expect(zip32Header.getNumberOfDiskWhereCentralDirectoriesStart()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectoriesOnThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getSizeOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getCentralDirectoriesOffsetWithStartingDisk()).to.be.equal(0)
    })

    it('should assert NumberOfThisDisk is 2 bytes unsigned', () => {

        const zip32Header = new Zip32Header()

        try {

            zip32Header.setNumberOfThisDisk(-70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert NumberOfDiskWhereCentralDirectoriesStart getter/setter', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setNumberOfDiskWhereCentralDirectoriesStart(5)
        const value = zip32Header.getNumberOfDiskWhereCentralDirectoriesStart()

        expect(zip32Header.getNumberOfThisDisk()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(zip32Header.getNumberOfCentralDirectoriesOnThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getSizeOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getCentralDirectoriesOffsetWithStartingDisk()).to.be.equal(0)
    })

    it('should assert NumberOfDiskWhereCentralDirectoriesStart is 2 bytes unsigned', () => {

        const zip32Header = new Zip32Header()

        try {

            zip32Header.setNumberOfDiskWhereCentralDirectoriesStart(-70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert NumberOfCentralDirectoriesOnThisDisk getter/setter', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setNumberOfCentralDirectoriesOnThisDisk(5)
        const value = zip32Header.getNumberOfCentralDirectoriesOnThisDisk()

        expect(zip32Header.getNumberOfThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfDiskWhereCentralDirectoriesStart()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(zip32Header.getNumberOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getSizeOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getCentralDirectoriesOffsetWithStartingDisk()).to.be.equal(0)
    })

    it('should assert NumberOfCentralDirectoriesOnThisDisk is 2 bytes unsigned', () => {

        const zip32Header = new Zip32Header()

        try {

            zip32Header.setNumberOfCentralDirectoriesOnThisDisk(-70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert NumberOfCentralDirectories getter/setter', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setNumberOfCentralDirectories(5)
        const value = zip32Header.getNumberOfCentralDirectories()

        expect(zip32Header.getNumberOfThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfDiskWhereCentralDirectoriesStart()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectoriesOnThisDisk()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(zip32Header.getSizeOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getCentralDirectoriesOffsetWithStartingDisk()).to.be.equal(0)
    })

    it('should assert NumberOfCentralDirectories is 2 bytes unsigned', () => {

        const zip32Header = new Zip32Header()

        try {

            zip32Header.setNumberOfCentralDirectories(-70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert SizeOfCentralDirectories getter/setter', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setSizeOfCentralDirectories(5)
        const value = zip32Header.getSizeOfCentralDirectories(0)

        expect(zip32Header.getNumberOfThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfDiskWhereCentralDirectoriesStart()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectoriesOnThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectories()).to.be.equal(0)
        expect(value).to.be.equal(5)
        expect(zip32Header.getCentralDirectoriesOffsetWithStartingDisk()).to.be.equal(0)
    })

    it('should assert SizeOfCentralDirectories is 2 bytes unsigned', () => {

        const zip32Header = new Zip32Header()

        try {

            zip32Header.setSizeOfCentralDirectories(-70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert CentralDirectoriesOffsetWithStartingDisk getter/setter', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setCentralDirectoriesOffsetWithStartingDisk(5)
        const value = zip32Header.getCentralDirectoriesOffsetWithStartingDisk()

        expect(zip32Header.getNumberOfThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfDiskWhereCentralDirectoriesStart()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectoriesOnThisDisk()).to.be.equal(0)
        expect(zip32Header.getNumberOfCentralDirectories()).to.be.equal(0)
        expect(zip32Header.getSizeOfCentralDirectories()).to.be.equal(0)
        expect(value).to.be.equal(5)
    })

    it('should assert CentralDirectoriesOffsetWithStartingDisk is 2 bytes unsigned', () => {

        const zip32Header = new Zip32Header()

        try {

            zip32Header.setCentralDirectoriesOffsetWithStartingDisk(-70000)
        } catch (err) {

            expect(err).to.be.an('error')
        }
    })

    it('should assert ZipFileComment getter/setter', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setZipFileComment('zip comment')
        const value = zip32Header.getZipFileComment()

        expect(value).to.be.equal('zip comment')
    })

    it('should assert ZipFileComment returns empty string if never set', () => {

        const zip32Header = new Zip32Header()
        const value = zip32Header.getZipFileComment()

        expect(value).to.be.equal('')
    })

    it('should assert HeaderLength getter with zip comment', () => {

        const zip32Header = new Zip32Header()
        zip32Header.setZipFileComment('keke')
        const value = zip32Header.getHeaderLength()

        expect(value).to.be.equal(Zip32HeaderSerializer.HEADER_FIXED_LENGTH + 4)
    })

    it('should assert HeaderLength getter without zip comment', () => {

        const zip32Header = new Zip32Header()
        const value = zip32Header.getHeaderLength()

        expect(value).to.be.equal(Zip32HeaderSerializer.HEADER_FIXED_LENGTH)
    })
})

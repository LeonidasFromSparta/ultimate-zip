import {zip32HeaderDecoder, zip64LocatorDecoder, zip64HeaderDecoder} from './../lib/decoders'
import {sync} from './../lib/fs-compat'
import {END_MAX} from './../lib/constants'
import {ELO_HDR} from './../lib/constants'

const getZipHeader = (fd) => {

    const size = sync.fstatSync(fd).size

    const h32Pos = (size - END_MAX) < 0 ? 0 : size - END_MAX

    const zip32Buffer = sync.readSync(fd, h32Pos, END_MAX)
    const header32 = zip32HeaderDecoder(zip32Buffer, size)

    const startPos = header32.headerOffset - ELO_HDR
    const locatorBuffer = sync.readSync(fd, startPos, ELO_HDR)
    const locator = zip64LocatorDecoder(locatorBuffer)

    if (locator) {

        const buffer = sync.readSync(fd, locator.zip64Offset, 48)
        return zip64HeaderDecoder(buffer)
    }

    return header32
}

export {getZipHeader}

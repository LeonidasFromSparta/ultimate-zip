import CentralHeader from './central-header'
import {CEN_SIG} from './constants'
import {CEN_SPO} from './constants'
import {CEN_VEM} from './constants'
import {CEN_PLM} from './constants'
import {CEN_VER} from './constants'
import {CEN_PLT} from './constants'
import {CEN_FLG} from './constants'
import {CEN_MTD} from './constants'
import {CEN_TIM} from './constants'
import {CEN_DAT} from './constants'
import {CEN_CRC} from './constants'
import {CEN_SIC} from './constants'
import {CEN_SIU} from './constants'
import {CEN_FLE} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_DSK} from './constants'
import {CEN_ATT} from './constants'
import {CEN_ATX} from './constants'
import {CEN_OFF} from './constants'
import {CEN_HDR} from './constants'
import {CEN_MAX} from './constants'

export default class CentralHeaderDecoder {

    _buffer = Buffer.alloc(CEN_MAX)
    _offset = 0

    update = (chunk) => {

        if (this._offset < CEN_HDR) {

            const remainingBytes = CEN_HDR - this._offset
            const bytesRead = chunk.copy(this._buffer, this._offset, 0, remainingBytes)
            this._offset += bytesRead

            if (this._offset !== CEN_HDR)
                return null

            chunk = chunk.slice(bytesRead)

            this._nameLen = this._buffer.readUInt16LE(CEN_FLE)
            this._extraLen = this._buffer.readUInt16LE(CEN_ELE)
            this._commentLen = this._buffer.readUInt16LE(CEN_CLE)
            this._bufferLen = CEN_HDR + this._nameLen + this._extraLen + this._commentLen
        }

        const remainingBytes = this._bufferLen - this._offset
        const bytesRead = chunk.copy(this._buffer, this._offset, 0, remainingBytes)
        this._offset += bytesRead

        if (this._offset !== this._bufferLen)
            return null

        return chunk.slice(bytesRead)
    }

    decode = () => {

        const signature = this._buffer.readUInt32LE(CEN_SPO)

        if (signature !== CEN_SIG) {

            const expectedSignature = '0x' + CEN_SIG.toString(16).padStart(8, '0')
            const actualSignature = '0x' + signature.toString(16).padStart(8, '0')

            throw (`Local file header signature could not be confirmed: actual ${actualSignature} expected ${expectedSignature}`)
        }

        this._offset = 0

        const header = new CentralHeader()

        header.setVersionMadeBy(this._buffer.readUInt8(CEN_VEM))
        header.setPlatformCompatibility(this._buffer.readUInt8(CEN_PLM))
        header.setVersionNeededToExtract(this._buffer.readUInt8(CEN_VER))
        header.setPlatformNeededToExtract(this._buffer.readUInt8(CEN_PLT))
        header.setGeneralPurposeBitFlag(this._buffer.readUInt16LE(CEN_FLG))
        header.setCompressionMethod(this._buffer.readUInt16LE(CEN_MTD))
        header.setLastModFileTime(this._buffer.readUInt16LE(CEN_TIM))
        header.setLastModFileDate(this._buffer.readUInt16LE(CEN_DAT))
        header.setCRC32(this._buffer.readUInt32LE(CEN_CRC))
        header.setCompressedSize(this._buffer.readUInt32LE(CEN_SIC))
        header.setUncompressedSize(this._buffer.readUInt32LE(CEN_SIU))
        header.setFileNameLength(this._nameLen)
        header.setExtraFieldLength(this._extraLen)
        header.setFileCommentLength(this._commentLen)
        header.setDiskNumberStart(this._buffer.readUInt16LE(CEN_DSK))
        header.setInternalFileAttributes(this._buffer.readUInt16LE(CEN_ATT))
        header.setExternalFileAttributes(this._buffer.readUInt32LE(CEN_ATX))
        header.setOffsetOfLocalHeader(this._buffer.readUInt32LE(CEN_OFF))

        header.setFileName(this._buffer.toString('utf8', CEN_HDR, CEN_HDR + this._nameLen))

        const extraBuf = Buffer.allocUnsafe(this._extraLen)
        this._buffer.copy(extraBuf, 0, CEN_HDR + this._nameLen, CEN_HDR + this._nameLen + this._extraLen)
        header.setExtraField(extraBuf)

        for (let offset=0; offset < header.getExtraField().length; offset++) {

            const headerId = header.getExtraField().readUInt16LE(offset)
            offset += 2
            const dataSize = header.getExtraField().readUInt16LE(offset)
            offset += 2

            if (headerId === 0x0001) {

                if (header.getUncompressedSize() === 0xFFFFFFFF) {

                    header.setUncompressedSize(parseInt(header.getExtraField().readBigUInt64LE(offset)))
                    offset += 8
                }

                if (header.getCompressedSize() === 0xFFFFFFFF) {

                    header.setCompressedSize(parseInt(header.getExtraField().readBigUInt64LE(offset)))
                    offset += 8
                }

                if (header.getOffsetOfLocalHeader() === 0xFFFFFFFF) {

                    header.setOffsetOfLocalHeader(parseInt(header.getExtraField().readBigUInt64LE(offset)))
                    offset += 8
                }

                if (header.getDiskNumberStart() === 0xFFFF) {

                    header.setDiskNumberStart(parseInt(header.getExtraField().readUInt32LE(offset)))
                    offset += 4
                }

                break
            } else {

                offset += dataSize
            }
        }

        header.setFileComment(this._buffer.toString('utf8', CEN_HDR + this._nameLen + this._extraLen, CEN_HDR + this._nameLen + this._extraLen + this._commentLen))
        return header
    }
}

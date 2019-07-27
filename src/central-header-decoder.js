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

export default class CentralHeaderDecoder {

    _buffer = []
    _offset = 0

    _extraBuffer = []
    _extraOffset = 0

    _nameLen = 0
    _extraLen = 0
    _commentLen = 0
    _extraBufferLen = 0

    update = (data) => {

        if (data.length >= (CEN_HDR - this._offset)) {

            this._buffer.push(data.slice(0, CEN_HDR - this._offset))
            this._offset += (CEN_HDR - this._offset)

            this._buffer = this._mergeBuffers(this._buffer)
            this._verifySignature()
            return data.slice(CEN_HDR - this._offset)
        }

        if (data.length < (CEN_HDR - this._offset)) {

            this._buffer.push(data)
            this._offset += data.length
        }
    }

    _mergeBuffers = (buffers) => {

        Buffer.concat(buffers, buffers.reduce((obj, acc) => acc + obj.length, 0))
    }

    _verifySignature = () => {

        const signature = this._buffer.readUInt32LE(CEN_SPO)

        if (signature !== CEN_SIG) {

            const expectedSignature = '0x' + CEN_SIG.toString(16).padStart(8, '0')
            const actualSignature = '0x' + signature.toString(16).padStart(8, '0')

            throw (`Central file header signature could not be confirmed: actual ${actualSignature} expected ${expectedSignature}`)
        }
    }

    updateInconstant = (data) => {

        this._createInconstantLength()

        if (data.length >= (this._extraBufferLen - this._extraOffset)) {

            this._extraBuffer.push(data.slice(0, this._extraBufferLen - this._extraOffset))
            this._extraOffset += (this._extraBufferLen - this._extraOffset)

            this._extraBuffer = this._mergeBuffers(this._extraBuffer)
            return data.slice(this._extraBufferLen - this._extraOffset)
        }

        if (data.length < (this._extraBufferLen - this._extraOffset)) {

            this._extraBuffer.push(data)
            this._offset += data.length
        }
    }

    _createInconstantLength = () => {

        if (this._extraOffset === 0) {

            this._nameLen = this._buffer.readUInt16LE(CEN_FLE)
            this._extraLen = this._buffer.readUInt16LE(CEN_ELE)
            this._commentLen = this._buffer.readUInt16LE(CEN_CLE)
            this._extraBufferLen = this._nameLen + this._extraLen + this._commentLen
        }
    }

    decode = () => {

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

import {CEN_SIG} from './constants'
import {CEN_SIP} from './constants'
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

export default class CentralHeader {

    constructor(buffer) {

        this._buffer = buffer
    }

    getSignature = () => this._buffer.readUInt32LE(CEN_SIP)
    setSignature = (value) => this._buffer.writeUInt32LE(value, CEN_SIP)

    getVersionMadeBy = () => this._buffer.readUInt8(CEN_VEM)
    setVersionMadeBy = (value) => this._buffer.writeUInt8(value, CEN_VEM)

    getPlatformCompatibility = () => this._buffer.readUInt8(CEN_PLM)
    setPlatformCompatibility = (value) => this._buffer.writeUInt8(value, CEN_PLM)

    getVersionNeededToExtract = () => this._buffer.readUInt8(CEN_VER)
    setVersionNeededToExtract = (value) => this._buffer.writeUInt8(value, CEN_VER)

    getPlatformNeededToExtract = () => this._buffer.readUInt8(CEN_PLT)
    setPlatformNeededToExtract = (value) => this._buffer.writeUInt8(value, CEN_PLT)

    getGeneralPurposeBitFlag = () => this._buffer.readUInt16LE(CEN_FLG)
    setGeneralPurposeBitFlag = (value) => this._buffer.writeUInt16LE(value, CEN_FLG)

    getCompressionMethod = () => this._buffer.readUInt16LE(CEN_MTD)
    setCompressionMethod = (value) => this._buffer.writeUInt16LE(value, CEN_MTD)

    getLastModFileTime = () => this._buffer.readUInt16LE(CEN_TIM)
    setLastModFileTime = (value) => this._buffer.writeUInt16LE(value, CEN_TIM)

    getLastModFileDate = () => this._buffer.readUInt16LE(CEN_DAT)
    setLastModFileDate = (value) => this._buffer.writeUInt16LE(value, CEN_DAT)

    getCRC32 = () => this._buffer.readUInt32LE(CEN_CRC)
    setCRC32 = (value) => this._buffer.writeUInt32LE(value, CEN_CRC)

    getCompressedSize = () => this._buffer.readUInt32LE(CEN_SIC)
    setCompressedSize = (value) => this._buffer.writeUInt32LE(value, CEN_SIC)

    getUncompressedSize = () => this._buffer.readUInt32LE(CEN_SIU)
    setUncompressedSize = (value) => this._buffer.writeUInt32LE(value, CEN_SIU)

    getFileNameLength = () => this._buffer.readUInt16LE(CEN_FLE)
    setFileNameLength = (value) => this._buffer.writeUInt16LE(value, CEN_FLE)

    getExtraFieldLength = () => this._buffer.readUInt16LE(CEN_ELE)
    setExtraFieldLength = (value) => this._buffer.writeUInt16LE(value, CEN_ELE)

    getFileCommentLength = () => this._buffer.readUInt16LE(CEN_CLE)
    setFileCommentLength = (value) => this._buffer.writeUInt32LE(value, CEN_CLE)

    getDiskNumberStart = () => this._buffer.readUInt16LE(CEN_DSK)
    setDiskNumberStart = (value) => this._buffer.writeUInt16LE(value, CEN_DSK)

    getInternalFileAttributes = () => this._buffer.readUInt16LE(CEN_ATT)
    setInternalFileAttributes = (value) => this._buffer.writeUInt16LE(value, CEN_ATT)

    getExternalFileAttributes = () => this._buffer.readUInt32LE(CEN_ATX)
    setExternalFileAttributes = (value) => this._buffer.writeUInt32LE(value, CEN_ATX)

    getOffsetOfLocalFileHeader = () => this._buffer.readUInt32LE(CEN_OFF)
    setOffsetOfLocalFileHeader = (value) => this._buffer.writeUInt32LE(value, CEN_OFF)

    getFileName = () => this._buffer.toString('utf8', CEN_HDR, CEN_FLE)
    setFileName = (value) => {

        const nameBuffer = Buffer.from(value)

        const newNameLen = nameBuffer.length
        const oldNameLen = this.getFileNameLength()

        if (oldNameLen !== newNameLen) {

            const extraLen = this.getExtraFieldLength()
            const commentLen = this.getFileCommentLength()

            const newBuffer = Buffer.allocUnsafe(CEN_HDR + newNameLen + extraLen + commentLen)
            this._buffer.copy(newBuffer, 0, 0, CEN_HDR)

            // file len
            this.setFileNameLength(newNameLen)

            // extra
            this._buffer.copy(newBuffer, CEN_HDR + newNameLen, CEN_HDR + oldNameLen, CEN_HDR + oldNameLen + extraLen)

            // comment
            this._buffer.copy(newBuffer, CEN_HDR + newNameLen + extraLen, CEN_HDR + oldNameLen + extraLen, CEN_HDR + oldNameLen + extraLen + commentLen)
        }

        nameBuffer.copy(nameBuffer, CEN_HDR, 0)
    }

    getExtraField = () => {

        const extraFieldLen = this.getExtraFieldLength()
        const buffer = Buffer.allocUnsafe(extraFieldLen)
        const nameLen = this.getFileCommentLength()

        this._buffer.copy(buffer, 0, CEN_HDR + nameLen, CEN_HDR + nameLen + extraFieldLen)
        return buffer
    }

    setExtraField = (value) => {

        const extraBuffer = Buffer.from(value)

        const newExtraLen = extraBuffer.length
        const oldExtraLen = this.getExtraFieldLength()
        const nameLen = this.getFileNameLength()

        if (oldExtraLen !== newExtraLen) {

            const commentLen = this.getFileCommentLength()

            const newBuffer = Buffer.allocUnsafe(CEN_HDR + nameLen + newExtraLen + commentLen)
            this._buffer.copy(newBuffer, 0, 0, CEN_HDR + nameLen)

            // comment
            this._buffer.copy(newBuffer, CEN_HDR + nameLen + newExtraLen, CEN_HDR + nameLen + oldExtraLen, CEN_HDR + nameLen + oldExtraLen + commentLen)

            // extra len
            this.setExtraFieldLength(newExtraLen)
        }

        extraBuffer.copy(this._buffer, CEN_HDR + nameLen, CEN_HDR + nameLen + newExtraLen)
    }

    getFileComment = () => {

        const nameLen = this.getFileNameLength()
        const extraLen = this.getExtraFieldLength()
        const commentLen = this.getFileCommentLength()
        return this._buffer.toString('utf8', CEN_HDR + nameLen + extraLen, CEN_HDR + nameLen + extraLen + commentLen)
    }

    setFileComment = (value) => {

        const commentBuffer = Buffer.from(value)

        const newCommentLen = commentBuffer.length
        const oldCommentLen = this.getFileComment()

        const nameLen = this.getFileNameLength()
        const extraLen = this.getExtraFieldLength()

        if (oldCommentLen !== newCommentLen) {

            const newBuffer = Buffer.allocUnsafe(CEN_HDR + nameLen + extraLen + newCommentLen)
            this._buffer.copy(newBuffer, 0, 0, CEN_HDR + nameLen + extraLen)

            // comment len
            this.setFileCommentLength(newCommentLen)
        }

        commentBuffer.copy(this._buffer, CEN_HDR + nameLen + extraLen)
    }

    getHeaderSize = () => CEN_HDR + this.getFileNameLength() + this.getExtraFieldLength() + this.getFileCommentLength()

    isDirectory = () => this.getCompressedSize() === 0

    isCompressed = () => this.getCompressedSize() !== this.getUncompressedSize()

    _confirmSignature = () => {

        const signature = this.getSignature()

        if (this.getSignature() !== CEN_SIG) {

            const expectedSignature = '0x' + CEN_SIG.toString(16).padStart(8, '0')
            const actualSignature = '0x' + signature.toString(16).padStart(8, '0')

            throw new ({
                name: 'Central header signature error',
                message: `Central header signature could not be confirmed: expected ${expectedSignature}, actual ${actualSignature}`
            })
        }
    }
}

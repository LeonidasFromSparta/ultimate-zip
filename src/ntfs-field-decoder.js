import NtfsField from './ntfs-field'
import {NTFS_MOD_TIME} from './constants'
import {NTFS_ACC_TIME} from './constants'
import {NTFS_CRE_TIME} from './constants'

export default class NTFSFieldDecoder {

    update = (chunk) => {

        if (chunk.readUInt16LE(0) !== 0x000A)
            return false

        this._buffer = chunk
    }

    decode = () => {

        const field = new NtfsField()

        field.setModificationTime(this._buffer.readBigInt64LE(NTFS_MOD_TIME))
        field.setAccessTime(this._buffer.readBigInt64LE(NTFS_ACC_TIME))
        field.setCreationTime(this._buffer.readBigInt64LE(NTFS_CRE_TIME))

        return field
    }
}

const EOCDR_signature = 0x06054b50
const CDR_signature = 0x02014b50
const LFH_signature = 0x04034b50

export const locate_EOCDR_offset = (buff) => {

    for (let offset = buff.length - 4; offset !== -1; offset--)
        if (buff.readUInt32LE(offset) === EOCDR_signature)
            return offset

    return -1
}

export const locate_CDR_offset = (buff) => {

    for (let offset = buff.length - 4; offset !== -1; offset--)
        if (buff.readUInt32LE(offset) === CDR_signature)
            return offset

    return -1
}

export const locate_LFH_offset = (buff) => {

    for (let offset = buff.length - 4; offset !== -1; offset--)
        if (buff.readUInt32LE(offset) === LFH_signature)
            return offset

    return -1
}

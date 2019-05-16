const EOCDR_signature = 0x06054b50

export const locate_EOCDR_offset = (buff) => {

    for (let offset = buff.length - 4; offset !== -1; offset--)
        if (buff.readUInt32LE(offset) === EOCDR_signature)
            return offset

    return -1
}

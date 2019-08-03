const capableOfCopying = (targetOff, targetLength, sourceOff, sourceLength) => targetOff < targetLength && sourceOff < sourceLength

export const copy = (target, targetOff, source) => {

    let sourceOff = 0

    while (capableOfCopying(targetOff, target.length, sourceOff, source.length))
        target[targetOff++] = source[sourceOff++]

    return sourceOff
}

export const verifySignature = (buffer, pos, expected, message) => {

    const signature = buffer.readUInt32LE(pos)

    if (signature !== expected)
        throw (message)
}

const verifySignature = (expected, observed, message) => {

    if (expected !== observed)
        throw (message)
}

const calculateLength = (data, fields, intial) => fields.reduce((acc, pos) => acc + data.readUInt16LE(pos), intial)

export {verifySignature, calculateLength}

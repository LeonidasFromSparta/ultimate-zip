const CenHeader = function() {

    this.checksum = 0
    this.method = 0
    this.inflatedSize = 0
    this.deflatedSize = 0
    this.externalFileAttrs = 0
    this.localOffset = 0
    this.fileName = ''
}

CenHeader.prototype.isDirectory = function() {

    return (this.externalFileAttrs & 0x10) === 0x10
}

CenHeader.prototype.isDeflated = function() {

    return this.method !== 0
}

export default CenHeader

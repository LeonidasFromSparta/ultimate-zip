export default class Zip64Locator {

    getSignature = () => this._sig
    setSignature = (value) => this._sig = value

    getDiskNumberWhereZip64HeaderStarts = () => this._zip64EndDisk
    setDiskNumberWhereZip64HeaderStarts = (value) => this._zip64EndDisk = value

    getOffsetZip64Header = () => this._offZip64Header
    setOffsetZip64Header = (value) => this._offZip64Header = value

    getTotalDisksNumber = () => this._disksNum
    setTotalDisksNumber = (value) => this._disksNum = value

    getHeaderLength = () => this._len
    setHeaderLength = (value) => this._len = value
}

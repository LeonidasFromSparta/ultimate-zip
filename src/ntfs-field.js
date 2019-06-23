export default class NtfsField {

    getModificationTime = () => this._modificationTime

    setModificationTime = (value) => this._modificationTime = value

    getAccessTime = () => this._accessTime

    setAccessTime = (value) => this._accessTime = value

    getCreationTime = () => this._creationTime

    setCreationTime = (value) => this._creationTime = value
}

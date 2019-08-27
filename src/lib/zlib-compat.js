import {inflateRaw, createInflateRaw, inflateRawSync} from 'zlib'

const inflate = (deflated) =>
    new Promise((resolve, reject) => inflateRaw(deflated, (err, inflated) => err ? reject(err) : resolve(inflated)))

const inflateSync = inflateRawSync

const streamingInflate = createInflateRaw

const sync = {
    inflateSync
}

const async = {
    inflate,
    streamingInflate
}

export {sync, async}

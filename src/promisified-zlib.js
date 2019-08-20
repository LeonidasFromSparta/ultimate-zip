import {inflateRaw} from 'zlib'

export const promisifedInflateRaw = (deflated) => {

    return new Promise((resolve, reject) => {

        inflateRaw(deflated, (err, inflated) => {

            err ? reject(err) : resolve(inflated)
        })
    })
}

export {
    promisifedInflateRaw as inflateRaw
}

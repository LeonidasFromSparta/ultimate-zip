import fs from 'fs'
import {promisify} from 'util'

export const open = promisify(fs.open)
export const close = promisify(fs.close)
export const fstat = promisify(fs.fstat)
export const stat = promisify(fs.stat)
export const read = promisify(fs.read)
export const mkdir = promisify(fs.mkdir)
export const writeFile = promisify(fs.writeFile)

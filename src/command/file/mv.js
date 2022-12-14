import { rm } from "node:fs/promises";
import { resolve } from 'node:path'
import { cp } from './cp.js'

const mv = async (sourceFilePath, destFilePath) => {
  try {
    const isNotCopied = await cp(sourceFilePath, destFilePath)

    if (isNotCopied) {
      throw new Error('File is not coppied')
    }

    const resolvedSourcePath = resolve(sourceFilePath)
    return await rm(resolvedSourcePath)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { mv }
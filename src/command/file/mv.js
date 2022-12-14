import { cp } from './cp.js'
import { rm } from './rm.js'

const mv = async (sourceFilePath, destFilePath) => {
  try {
    const isNotCopied = await cp(sourceFilePath, destFilePath)

    if (isNotCopied) {
      throw new Error('File is not coppied')
    }

    return await rm(sourceFilePath)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { mv }
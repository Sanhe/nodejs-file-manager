import { rm as rmNative } from 'node:fs/promises'
import { resolve } from 'node:path'

const rm = async (filePath) => {
  try {
    const resolvedFilePath = await resolve(filePath)

    return await rmNative(resolvedFilePath)
  } catch (error) {
    throw new Error(error)
  }
}

export { rm }
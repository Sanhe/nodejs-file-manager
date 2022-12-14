import { rename } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const rn = async (pathToFile, newFileName) => {
  try {
    const resolvedPath = resolve(pathToFile)

    const resolvedPathToDir = dirname(resolvedPath)
    const resolvedNewPath = resolve(resolvedPathToDir, newFileName)

    await rename(resolvedPath, resolvedNewPath)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { rn }

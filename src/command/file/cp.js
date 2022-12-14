import { finished } from 'node:stream/promises'
import { open } from 'node:fs/promises'
import { basename, resolve } from 'node:path'

const getReadStreamFromSourceFilePath = async (sourceFilePath) => {
  try {
    const resolvedPath = resolve(sourceFilePath)

    const fileHandle = await open(resolvedPath)

    return await fileHandle.createReadStream({ encoding: 'utf8' })
  }
  catch (error) {
    throw new Error(error)
  }
}

const getWriteStreamToDestFilePath = async (sourceFilePath, destDirectoryPath) => {
  try {
    const resolvedPath = resolve(sourceFilePath)
    const fileName = basename(resolvedPath)
    const resolvedDestPath = resolve(destDirectoryPath, fileName)

    const fileHandleDest = await open(resolvedDestPath, 'a+')

    return fileHandleDest.createWriteStream()
  }
  catch (error) {
    throw new Error(error)
  }
}

const cp = async (sourceFilePath, destDirectoryPath) => {
  try {
    const readStream = await getReadStreamFromSourceFilePath(sourceFilePath)
    const writeStream = await getWriteStreamToDestFilePath(sourceFilePath, destDirectoryPath)

    readStream.pipe(writeStream)
    return await finished(readStream)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { cp }

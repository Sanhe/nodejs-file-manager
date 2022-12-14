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

const getWriteStreamToDestFilePath = async (sourceFilePath, destFilePath) => {
  try {
    const resolvedPath = resolve(sourceFilePath)
    const fileName = basename(resolvedPath)
    const resolvedDestPath = resolve(destFilePath, fileName)

    const fileHandleDest = await open(resolvedDestPath, 'a+')

    return fileHandleDest.createWriteStream()
  }
  catch (error) {
    throw new Error(error)
  }
}

const cp = async (sourceFilePath, destFilePath) => {
  try {
    const readStream = await getReadStreamFromSourceFilePath(sourceFilePath)
    const writeStream = await getWriteStreamToDestFilePath(sourceFilePath, destFilePath)

    readStream.pipe(writeStream)
    await finished(readStream)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { cp }

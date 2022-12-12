import { open } from 'node:fs/promises'
import { resolve } from 'node:path'
import { stdout } from 'node:process'
import { finished } from 'node:stream/promises';

const cat = async (filePath) => {
  try {
    const filehandle = await open(resolve(filePath))
    const readStream = filehandle.createReadStream({ encoding: 'utf8' })

    readStream.pipe(stdout)
    await finished(readStream)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { cat }

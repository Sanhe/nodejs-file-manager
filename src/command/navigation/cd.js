import { chdir } from 'node:process'
import { resolve } from 'node:path'

const cd = (inputPath) => {
  try {
    const resolvedPath = resolve(inputPath)
    chdir(resolvedPath)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { cd }

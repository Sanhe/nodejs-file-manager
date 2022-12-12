import { chdir, cwd } from 'node:process'

const cd = (path) => {
  try {
    chdir(path)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { cd }

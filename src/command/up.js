import { chdir, cwd } from 'node:process'

const up = () => {
  try {
    chdir('..')

    return cwd()
  }
  catch (error) {
    throw new Error(error)
  }
}

export { up }

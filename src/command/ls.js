import { readdir } from 'node:fs/promises'
import { cwd } from 'node:process'

const TYPE_DIRECTORY = 'directory'
const TYPE_FILE = 'file'

const formatFiles = (file) => ({
  name: file.name,
  type: file.isDirectory() ? TYPE_DIRECTORY : TYPE_FILE,
})

const sortFiles = (file1, file2) => {
  if (file1.type === file2.type) {
    return file1.name.localeCompare(file2.name)
  }

  return file1.type.localeCompare(file2.type)
}

const ls = async () => {
  try {
    const path = cwd()
    const files = await readdir(path, { withFileTypes: true })
    const table = files.map(formatFiles).sort(sortFiles)

    console.table(table)
  }
  catch (error) {
    throw new Error(error)
  }
}

export { ls }

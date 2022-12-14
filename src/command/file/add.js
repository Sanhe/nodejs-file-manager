import { cwd } from 'node:process'
import { resolve } from 'node:path'
import { writeFile } from "node:fs/promises";

const add = async (fileName) => {
  try {
    const path = cwd()
    const resolvedPath = resolve(path, fileName)
    await writeFile(resolvedPath, '', {flag: 'wx+'})
  } catch (error) {
    throw new Error(error)
  }
}

export { add }

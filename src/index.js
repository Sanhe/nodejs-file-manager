import { createInterface } from 'node:readline'
import { cwd, stdin as input, stdout as output } from 'node:process'
import { getUserName } from './handler/username.js'
import { exit } from './command/exit.js'
import { logCurrentPath } from './command/log.js'
import { up } from './command/navigation/up.js'
import { cd } from './command/navigation/cd.js'
import { ls } from './command/navigation/ls.js'
import { cat } from './command/file/cat.js'
import { add } from './command/file/add.js'

const ERROR_MESSAGE_OPERATION_FAILED = 'Operation failed'

const main = async () => {
  try {
    const userName = getUserName()

    if (!userName) {
      throw new Error('Username is not provided')
    }

    const commands = {
      '.exit': ({ userName }) => exit(userName),
      'up': up,
      'cd': (args) => {
          const path = args[0]

          return cd(path)
      },
      'ls': ls,
      'cat': async (args) => {
        const path = args[0]

        return await cat(path)
      },
      'add': async (args) => {
        const path = args[0]

        return await add(path)
      }
    }
    let currentPath = cwd()
    let commandArgs = {}

    console.info(`Welcome to the File Manager, ${userName}!\n`)
    logCurrentPath(currentPath)

    const readline = createInterface({ input, output, terminal: false })

    readline.on('line', async (line) => {
      const [command, ...args] = line.split(' ')
      commandArgs = { userName, ...args }

      const currentCommand = commands[command]
      const isCurrentCommandMissed = !currentCommand

      if (isCurrentCommandMissed) {
        console.error(ERROR_MESSAGE_OPERATION_FAILED)
        return
      }

      try {
        commandArgs = await currentCommand({ ...commandArgs })
      } catch (error) {
        console.error(ERROR_MESSAGE_OPERATION_FAILED)
        return
      }

      currentPath = cwd()

      logCurrentPath(currentPath)
    })
  }
  catch (error) {
    // console.error(error)
    console.error(error.message)
    throw new Error(ERROR_MESSAGE_OPERATION_FAILED)
  }
}

await main()
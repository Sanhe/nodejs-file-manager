import { createInterface } from 'node:readline'
import { cwd, stdin as input, stdout as output } from 'node:process'
import { getUserName } from './handler/username.js'
import { exit } from './command/exit.js'
import { logCurrentPath } from './command/log.js'
import { up } from './command/up.js'
import { cd } from './command/cd.js'
import { ls } from './command/ls.js'

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
    }
    let currentPath = cwd()
    let commandArgs = {}

    console.info(`Welcome to the File Manager, ${userName}!\n`)
    logCurrentPath(currentPath)

    const readline = createInterface({ input, output, terminal: false })

    readline.on('line', (line) => {
      const [command, ...args] = line.split(' ')
      commandArgs = { userName, ...args }

      const currentCommand = commands[command]
      const isCurrentCommandMissed = !currentCommand

      if (isCurrentCommandMissed) {
        console.error(ERROR_MESSAGE_OPERATION_FAILED)
        return
      }

      try {
        commandArgs = currentCommand({ ...commandArgs })
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
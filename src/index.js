import { createInterface } from 'node:readline'
import { cwd, stdin as input, stdout as output } from 'node:process'
import { getUserName } from './handler/username.js'
import { exit } from './command/exit.js'
import { logCurrentPath } from './command/log.js'
import { up } from './command/up.js'

const ERROR_MESSAGE_OPERATION_FAILED = 'Operation failed'

const main = async () => {
  try {
    const userName = getUserName()

    if (userName) {
      const commands = {
        '.exit': ({ userName }) => exit(userName),
        'up': ({ currentPath }) => {
          return { currentPath: up(currentPath) }
        },
      }
      let currentPath = cwd()
      let commandArgs = { currentPath }

      console.log(`Welcome to the File Manager, ${userName}!\n`)
      logCurrentPath(currentPath)

      const readline = createInterface({ input, output, terminal: false })

      readline.on('line', (line) => {
        const [command, ...args] = line.split(' ')
        commandArgs = { currentPath, userName, ...args }

        const currentCommand = commands[command]
        const isCurrentCommandMissed = !currentCommand

        if (isCurrentCommandMissed) {
          console.error(ERROR_MESSAGE_OPERATION_FAILED)
          return
        }

        commandArgs = currentCommand({ ...commandArgs })

        currentPath = commandArgs.currentPath

        logCurrentPath(currentPath)
      })
    }
    else {
      throw new Error('Username is not provided')
    }
  }
  catch (error) {
    console.error(error)
    // console.error(error.message)
    throw new Error(ERROR_MESSAGE_OPERATION_FAILED)
  }
}

await main()
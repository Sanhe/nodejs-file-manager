import { createInterface } from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { getUserName } from './utils/username.js'
import { exit } from './commands/exit.js'
import { logCurrentDirectory } from './commands/log.js'

const ERROR_MESSAGE_OPERATION_FAILED = 'Operation failed'

const main = async () => {
  try {
    const userName = getUserName()

    if (userName) {
      const commands = {
        '.exit': () => exit(userName),
      }

      console.log(`Welcome to the File Manager, ${userName}!\n`)
      logCurrentDirectory()

      const readline = createInterface({ input, output, terminal: false })

      readline.on('line', (line) => {
        logCurrentDirectory()

        const [command, ...args] = line.split(' ')

        const currentCommand = commands[command]
        const isCommandNotExists = !currentCommand;

        if (isCommandNotExists) {
          console.error(ERROR_MESSAGE_OPERATION_FAILED)
          return
        }

        currentCommand(...args);
      })
    }
    else {
      throw new Error('Username is not provided')
    }
  }
  catch (error) {
    console.error(error.message)
    throw new Error(ERROR_MESSAGE_OPERATION_FAILED)
  }
}

await main()
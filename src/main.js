import { createInterface } from 'node:readline';
import { cwd, stdin as input, stdout as output } from 'node:process';
import { getUserName } from './handler/username.js';
import { commandReader } from './handler/commandReader.js';
import { exit } from './command/exit.js';
import { printCurrentPath, printWelcomeMessage } from './handler/message.js';

const main = async () => {
  try {
    const userName = getUserName();

    printWelcomeMessage(userName);
    printCurrentPath(cwd());

    const readline = createInterface({ input, output });
    const commandReaderArgs = { userName, readline };

    readline.prompt();
    readline.
      on('line', async (line) => await commandReader(line, commandReaderArgs)).
      on('SIGINT', () => readline.close()).
      on('close', () => exit(userName));
  }
  catch (error) {
    console.error(error.message);
  }
};

export { main };
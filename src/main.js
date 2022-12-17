import { createInterface } from 'node:readline';
import { homedir } from 'node:os';
import { chdir, cwd, stdin as input, stdout as output } from 'node:process';
import { getUserName } from './handler/username.js';
import { commandReader } from './handler/commandReader.js';
import { exit } from './command/exit.js';
import {
  printCurrentPath,
  printErrorMessage,
  printWelcomeMessage,
} from './handler/message.js';

const main = async () => {
  try {
    const userName = getUserName();

    printWelcomeMessage(userName);
    chdir(homedir());
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
    printErrorMessage(error.message);
  }
};

export { main };
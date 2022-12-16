import { cwd } from 'node:process';
import { parseCommand } from './commandParser.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { printCurrentPath } from './message.js';
import { commands } from './commands.js';

const prompt = (readline) => {
  console.info('');
  printCurrentPath(cwd());
  readline.prompt();
};

const getCommand = (commandName) => {
  const command = commands?.[commandName];
  const isCommandMissed = !command;

  if (isCommandMissed) {
    throw new InvalidInputError();
  }

  return command;
};

const commandReader = async (line, commandReaderArgs) => {
  const { userName, readline } = commandReaderArgs;

  try {
    const { command, ...args } = parseCommand(line);
    const commandArgs = { userName, ...args };
    const currentCommand = getCommand(command);

    // try {
      await currentCommand({ ...commandArgs });
    // }
    // catch (error) {
    //   console.error(error.message);
    // }
  }
  catch (error) {
    console.error('Error:', error.message);
  }
  finally {
    prompt(readline);
  }
};

export { commandReader };
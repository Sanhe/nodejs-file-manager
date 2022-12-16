import { EOL } from 'node:os';

const parseCommand = (commandLine) => {
  const [command, ...args] = commandLine.
    toString().
    trim().
    replace(EOL, '').
    replace(/ +/g, ' ').
    split(' ');

  return {
    command,
    args,
  };
};

export { parseCommand };

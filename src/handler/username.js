import { argv } from 'node:process';
import { InvalidInputError } from '../error/InvalidInputError.js';

const getUserName = () => {
  const userNameArg = argv.find(arg => arg.startsWith('--username'));
  const userName = userNameArg?.indexOf('=')
    ? userNameArg.split('=')[1]
    : null;

  if (!userName) {
    throw new InvalidInputError();
  }

  return userName;
};

export { getUserName };

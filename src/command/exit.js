import { exit as pExit } from 'node:process';
import { printExitMessage } from '../handler/message.js';

const exit = (userName) => {
  console.info('');
  printExitMessage(userName);
  pExit(0);
};

export { exit };

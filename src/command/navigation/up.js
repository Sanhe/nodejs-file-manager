import { chdir } from 'node:process';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const up = () => {
  try {
    chdir('..');
  }
  catch {
    throw new OperationFailedError();
  }
};

export { up };

import { chdir } from 'node:process';
import { resolve } from 'node:path';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const cd = (inputPath) => {
  try {
    const resolvedPath = resolve(inputPath);
    chdir(resolvedPath);
  }
  catch (error) {
    throw new OperationFailedError();
  }
};

export { cd };

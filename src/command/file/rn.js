import { rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const rn = async (pathToFile, newFileName) => {
  try {
    const resolvedPath = resolve(pathToFile);

    const resolvedPathToDir = dirname(resolvedPath);
    const resolvedNewPath = resolve(resolvedPathToDir, newFileName);

    await rename(resolvedPath, resolvedNewPath);

    return true;
  }
  catch {
    throw new OperationFailedError();
  }
};

export { rn };

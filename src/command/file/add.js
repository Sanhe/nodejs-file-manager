import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const add = async (fileName) => {
  try {
    const path = cwd();
    const resolvedPath = resolve(path, fileName);
    await writeFile(resolvedPath, '', { flag: 'wx+' });

    return true;
  }
  catch {
    throw new OperationFailedError();
  }
};

export { add };

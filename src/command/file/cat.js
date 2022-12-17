import { open } from 'node:fs/promises';
import { resolve } from 'node:path';
import { stdout } from 'node:process';
import { finished } from 'node:stream/promises';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const cat = async (filePath) => {
  try {
    const fileHandle = await open(resolve(filePath));
    const readStream = fileHandle.createReadStream({ encoding: 'utf8' });

    readStream.pipe(stdout);
    return await finished(readStream);
  }
  catch {
    throw new OperationFailedError();
  }
};

export { cat };

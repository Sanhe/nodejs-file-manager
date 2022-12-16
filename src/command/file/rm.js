import { rm as rmNative } from 'node:fs/promises';
import { resolve } from 'node:path';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const rm = async (filePath) => {
  try {
    const resolvedFilePath = await resolve(filePath);

    return await rmNative(resolvedFilePath);
  }
  catch (error) {
    throw new OperationFailedError();
  }
};

export { rm };
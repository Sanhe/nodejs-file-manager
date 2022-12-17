import { cp } from './cp.js';
import { rm } from './rm.js';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const mv = async (sourceFilePath, destFilePath) => {
  try {
    const isNotCopied = await cp(sourceFilePath, destFilePath);

    if (isNotCopied) {
      throw new Error('File is not copied');
    }

    await rm(sourceFilePath);

    return true;
  }
  catch (e) {
    console.log(e.message);
    throw new OperationFailedError();
  }
};

export { mv };
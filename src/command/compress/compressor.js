import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { resolve } from 'node:path';
import { createBrotliCompress, createBrotliDecompress, constants } from 'node:zlib';
import { OperationFailedError } from '../../error/OperationFailedError.js';
import { isPathExist } from '../../validator/pathValidator.js';

const compressFile = async (pathToFile, pathToDestination, compressHandler) => {
  try {
    const resolvedPathToFile = resolve(pathToFile);
    const isPathToFileExist = await isPathExist(resolvedPathToFile);

    if (!isPathToFileExist) {
      throw new OperationFailedError();
    }

    const resolvedDestinationPath = resolve(pathToDestination);
    const isDestinationPathExist = await isPathExist(resolvedDestinationPath);

    if (isDestinationPathExist) {
      throw new OperationFailedError();
    }

    const source = createReadStream(resolvedPathToFile);
    const destination = createWriteStream(resolvedDestinationPath);

    await pipeline(source, compressHandler, destination);

    return true;
  }
  catch {
    throw new OperationFailedError();
  }
};

const compressBrotli = async (pathToFile, pathToDestination) => {
  return await compressFile(
    pathToFile,
    pathToDestination,
    createBrotliCompress({
      params: {
        [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
      },
    }));
};

const decompressBrotli = async (pathToFile, pathToDestination) => {
  return await compressFile(pathToFile, pathToDestination,
    createBrotliDecompress());
};

export { compressBrotli, decompressBrotli };

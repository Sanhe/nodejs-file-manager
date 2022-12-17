import { open } from "node:fs/promises";
import { pipeline } from 'stream/promises';
import { resolve } from 'node:path';
import { OperationFailedError } from '../error/OperationFailedError.js';

const { createHash } = await import("node:crypto");

const calculateHash = async (pathToFile) => {
  try {
    const fileHandle = await open(resolve(pathToFile));
    const inputStream = fileHandle.createReadStream();
    const hash = createHash("sha256");

    await pipeline(inputStream, hash);

    console.info(hash.digest('hex'));

    return true;
  }
  catch {
    throw new OperationFailedError();
  }
}

export { calculateHash };
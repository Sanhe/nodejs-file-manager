import osNative from 'node:os';
import { OperationFailedError } from '../../error/OperationFailedError.js';
import { InvalidInputError } from '../../error/InvalidInputError.js';

const eol = () => {
  console.info(osNative.EOL);
};

const cpus = () => {
  console.info(osNative.cpus());
};

const homedir = () => {
  console.info(osNative.homedir());
};

const username = () => {
  console.info(osNative.userInfo().username);
};

const architecture = () => {
  console.info(osNative.arch());
};

const options = {
  '--EOL': eol,
  '--cpus': cpus,
  '--homedir': homedir,
  '--username': username,
  '--architecture': architecture,
};

const os = async (option) => {
  try {
    const optionHandler = options[option];

    if (!optionHandler) {
      throw new InvalidInputError();
    }

    return await optionHandler();
  }
  catch (error) {
    if (error instanceof InvalidInputError) {
      throw error;
    }

    throw new OperationFailedError();
  }
};

export { os };
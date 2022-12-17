import osNative from 'node:os';
import { OperationFailedError } from '../../error/OperationFailedError.js';
import { InvalidInputError } from '../../error/InvalidInputError.js';

const eol = () => {
  console.log(`Default EOL: ${JSON.stringify(osNative.EOL)}`)
};

const cpus = () => {
  const cpus = osNative.cpus();

  console.info(`Number of CPUs: ${cpus.length}`);
  console.info(`CPU model: ${cpus[0].model}`);

  cpus.forEach((cpu, index) => {
    const speedInGHz = `${(cpu.speed / 1000)} GHz`;

    console.info(`- CPU core #${index + 1} speed: ${speedInGHz} GHz`);
  });
};

const homedir = () => {
  console.info(`Home directory: ${osNative.homedir()}`);
};

const username = () => {
  console.info(`System user name: ${osNative.userInfo().username}`);
};

const architecture = () => {
  console.info(`Architecture: ${osNative.arch()}`);
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

    await optionHandler();

    return true;
  }
  catch (error) {
    if (error instanceof InvalidInputError) {
      throw error;
    }

    throw new OperationFailedError();
  }
};

export { os };
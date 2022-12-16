import { exit } from '../command/exit.js';
import { up } from '../command/navigation/up.js';
import { cd } from '../command/navigation/cd.js';
import { ls } from '../command/navigation/ls.js';
import { cat } from '../command/file/cat.js';
import { add } from '../command/file/add.js';
import { rn } from '../command/file/rn.js';
import { cp } from '../command/file/cp.js';
import { mv } from '../command/file/mv.js';
import { rm } from '../command/file/rm.js';
import { os } from '../command/os/os.js';
import { InvalidInputError } from '../error/InvalidInputError.js';
import { calculateHash } from '../command/hash.js';

const getArg = (args, index = 0) => {
  const arg = args[index];
console.log(args, arg);
  const isArgMissed = !arg;

  if (isArgMissed) {
    throw new InvalidInputError();
  }

  return arg;
};

const commands = {
  '.exit': ({ userName }) => exit(userName),
  'up': up,
  'cd': ({ args }) => {
    const path = getArg(args);
    return cd(path);
  },
  'ls': ls,
  'cat': async ({ args }) => {
    const path = getArg(args);

    return await cat(path);
  },
  'add': async ({ args }) => {
    const path = getArg(args);

    return await add(path);
  },
  'rn': async ({ args }) => {
    const path = getArg(args);
    const newFileName = getArg(args, 1);

    return await rn(path, newFileName);
  },
  'cp': async ({ args }) => {
    const pathToFile = getArg(args);
    const pathDirectoryDest = getArg(args, 1);

    return await cp(pathToFile, pathDirectoryDest);
  },
  'mv': async ({ args }) => {
    const pathToFile = getArg(args);
    const pathDirectoryDest = getArg(args, 1);

    return await mv(pathToFile, pathDirectoryDest);
  },
  'rm': async ({ args }) => {
    const pathToFile = getArg(args);

    return await rm(pathToFile);
  },
  'os': async ({ args }) => {
    const option = getArg(args);

    return await os(option);
  },
  'hash': async ({ args }) => {
    const option = getArg(args);

    return await calculateHash(option);
  }
};

export { commands };

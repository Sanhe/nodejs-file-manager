import { chdir } from 'node:process';

const up = () => {
  try {
    chdir('..');
  }
  catch (error) {
    throw new Error(error);
  }
};

export { up };

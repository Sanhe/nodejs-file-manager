import { exit as pExit } from 'node:process';

const exit = (userName) => {
    console.info(`Thank you for using File Manager, ${userName}, goodbye!`)
    pExit(0);
}

export { exit };

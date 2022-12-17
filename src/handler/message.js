const printWelcomeMessage = (userName) => {
  console.info(`Welcome to the File Manager, ${userName}!\n`);
};

const printCurrentPath = (currentPath) => {
  console.info(`You are currently in ${currentPath}`);
};

const printExitMessage = (userName) => {
  console.info('');
  console.info(`Thank you for using File Manager, ${userName}, goodbye!`);
};

const printErrorMessage = (errorMessage) => {
  console.error('Error:', errorMessage);
}

export { printWelcomeMessage, printCurrentPath, printExitMessage, printErrorMessage };

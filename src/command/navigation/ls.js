import { readdir } from 'node:fs/promises';
import { cwd } from 'node:process';
import { OperationFailedError } from '../../error/OperationFailedError.js';

const TYPE_DIRECTORY = 'directory';
const TYPE_FILE = 'file';

const formatFiles = (file) => ({
  name: file.name,
  type: file.isDirectory() ? TYPE_DIRECTORY : TYPE_FILE,
});

const sortFiles = (file1, file2) => {
  const sortField = file1.type === file2.type
    ? 'name'
    : 'type';
  const field1 = file1[sortField];
  const field2 = file2[sortField];

  return field1.localeCompare(field2);
};

const ls = async () => {
  try {
    const path = cwd();
    const files = await readdir(path, { withFileTypes: true });
    const table = files.map(formatFiles).sort(sortFiles);

    if (!table.length) {
      console.info('No files or directories');

      return;
    }

    console.table(table);
  }
  catch (error) {
    throw new OperationFailedError();
  }
};

export { ls };

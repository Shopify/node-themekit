const path = require('path');

const cfg = require('../lib/config');
const runExecutable = require('../lib/run-executable');

jest.mock('child_process');

describe('runExecutable', () => {
  test('spawns child process with correct arguments', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const args = ['arg1', 'arg2', 'arg3'];
    const cwd = process.cwd();

    await runExecutable(args, cwd);

    expect(spawn).toBeCalledWith(pathToExecutable, args, {
      cwd,
      stdio: ['inherit', 'inherit', 'pipe']
    });
  });
});

const themekit = require('../lib/themekit');
const runExecutable = require('../lib/run-executable');

jest.mock('../lib/run-executable');

describe('command', () => {
  test('forces no-update-notifier flag', async () => {
    const args = ['version', '--someflag', '--no-update-notifier'];

    await themekit.command('version', {
      someFlag: true
    });

    expect(runExecutable).toBeCalledWith(args, expect.any(String), null);
  });

  test('passes cwd and logLevel properly to runExecutable', async () => {
    const cwd = process.cwd();
    const logLevel = 'info';

    await themekit.command('version', null, {cwd, logLevel});

    expect(runExecutable).toBeCalledWith(expect.any(Array), cwd, logLevel);
  });

  test('does not mutate input param', async () => {
    const flags = {someFlag: true};
    const flagsCopy = JSON.parse(JSON.stringify(flags));

    await themekit.command('version', flags);

    expect(flags).toMatchObject(flagsCopy);
  });
});

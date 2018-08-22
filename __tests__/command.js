const themekit = require('../lib/themekit');
const runExecutable = require('../lib/run-executable');

jest.mock('../lib/run-executable');

describe(('command'), () => {
  test('forces no-update-notifier flag', async () => {
    // arrange
    const args = ['version', '--some-flag', '--no-update-notifier'];
    // act
    await themekit.command('version', {
      someFlag: true
    });

    // assert
    expect(runExecutable).toBeCalledWith(args, expect.any(String), null);
  });

  test('passes cwd and logLevel properly to runExecutable', async () => {
    // arrange
    const cwd = process.cwd();
    const logLevel = 'info';

    // act
    await themekit.command('version', null, {cwd, logLevel});

    // assert
    expect(runExecutable).toBeCalledWith(expect.any(Array), cwd, logLevel);
  });

  test('does not mutate input param', async () => {
    // arrange
    const flags = {someFlag: true};
    const flagsCopy = JSON.parse(JSON.stringify(flags));

    // act
    await themekit.command('version', flags);

    // assert
    expect(flags).toMatchObject(flagsCopy);
  });
});


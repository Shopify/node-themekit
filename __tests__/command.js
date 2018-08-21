const path = require('path');

const cfg = require('../lib/config');
const themekit = require('../lib/themekit');

jest.mock('child_process');

describe(('command'), () => {
  test('passes correct args to child process', async () => {
    // arrange
    const args = ['version', '--no-update-notifier'];

    // act
    const {spawn} = require('child_process');
    await themekit.command('version');

    // assert
    expect.assertions(1);
    expect(spawn).toBeCalledWith(
      path.join(cfg.destination, cfg.binName),
      args,
      {cwd: expect.any(String)},
    );
  });

  test('does not mutate input param', async () => {
    // arrange
    const flags = {someFlag: true};
    const flagsCopy = JSON.parse(JSON.stringify(flags));

    // act
    await themekit.command('version', flags);

    // assert
    expect.assertions(1);
    expect(flags).toMatchObject(flagsCopy);
  });
});


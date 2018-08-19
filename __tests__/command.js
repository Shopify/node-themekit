const path = require('path');

const cfg = require('../lib/default-config');
const themekit = require('../lib/themekit');

jest.mock('child_process');

describe(('command'), () => {
  test('passes correct args to child process', async () => {
    // arrange
    const params = {args: ['version']};
    const args = params.args.concat(['--no-update-notifier']);

    // act
    const {spawn} = require('child_process');
    await themekit.command(params);

    // assert
    expect(spawn).toBeCalledWith(
      path.join(cfg.destination, cfg.binName),
      args,
      {cwd: expect.any(String)},
    );
  });

  test('does not mutate input param', async () => {
    // arrange
    const params = {args: ['version']};
    const duplicate = JSON.parse(JSON.stringify(params));

    // act
    await themekit.command(params);

    // assert
    expect(params).toMatchObject(duplicate);
  });
});


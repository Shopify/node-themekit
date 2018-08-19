const path = require('path');

const cfg = require('../lib/default-config');
const themekit = require('../lib/themekit');

jest.mock('child_process');

describe(('command'), () => {
  test('passes correct args to child process', async () => {
    const params = {args: ['version']};
    const {spawn} = require('child_process');
    await themekit.command(params);
    expect(spawn).toBeCalledWith(
      path.join(cfg.destination, cfg.binName),
      params.args,
      {cwd: expect.any(String)},
    );
  });
});

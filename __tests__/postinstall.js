const themekit = require('../lib/themekit');
const {version} = require('../lib/config');

test('successfully runs binary', async () => {
  global.process.stdout.write = jest.fn();
  await themekit.command('version');
  expect(global.process.stdout.write).toHaveBeenLastCalledWith(expect.stringContaining(version));
});

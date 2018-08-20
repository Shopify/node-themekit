const themekit = require('../lib/themekit');
const {version} = require('../lib/default-config');

test('successfully runs binary', async () => {
  // arrange
  global.console.log = jest.fn();
  // act
  await themekit.command('version');
  // assert
  expect(global.console.log).toHaveBeenLastCalledWith(expect.stringContaining(version));
});

const themekit = require('../lib/themekit');
const {version} = require('../lib/default-config');

test('successfully runs binary', async () => {
  // arrange
  jest.spyOn(global.console, 'log');
  // act
  await themekit.command({args: ['version']});
  // assert
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining(version));
});

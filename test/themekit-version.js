const command = require('../lib/command');

test('successfully grabs themekit version from gem', async () => {
  expect(command({args: ['version']})).resolves.toEqual('Theme Kit command finished');
});



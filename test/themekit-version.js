const command = require('../lib/command');

test('Successfully calls ThemeKit', () => {
  command({
    args: ['version']
  }, (err) => {
    expect(err).toBeUndefined();
  });
});



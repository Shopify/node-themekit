var command = require('../lib/command');

command({
  args: ['version']
}, function(err) {
  if (err) {
    return;
  }

  console.log('Test has completed.');
});

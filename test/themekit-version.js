var command = require('../lib/command');

command({
  args: ['version'],
}, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Theme Kit command has completed.');
});

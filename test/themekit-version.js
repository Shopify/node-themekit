var command = require('../lib/command');

command({
  args: ['version'],
}, function(err) {
  if (err) {
    process.stdout.write(err + '\n');
    return;
  }

  process.stdout.write('Theme Kit command has completed.\n');
});

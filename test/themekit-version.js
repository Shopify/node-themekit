var command = require('./command');

command({
  args: ['version']
}, function(err) {
  if (err) {
    process.stdout.write(err);
    return;
  }

  process.stdout.write('Theme Kit command has completed.\n');
});

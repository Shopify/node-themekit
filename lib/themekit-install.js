var install = require('./install');

install({
  logger: console.log, // eslint-disable-line no-console
}, function(err, path) {
  if (err) {
    process.stdout.write(err + '\n');
    return;
  }

  process.stdout.write('Theme Kit has been installed: ' + path + '\n');
});

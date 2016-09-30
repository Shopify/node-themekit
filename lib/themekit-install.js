var install = require('./install');

install({
  logger: console.log, // eslint-disable-line no-console
}, function(err, path) {
  if (err) {
    console.error(err + '\n');
    return;
  }

  console.log('Theme Kit has been installed: ' + path + '\n');
});

var join = require('path').join;
var spawn = require('child_process').spawn;
var statSync = require('fs').statSync; // eslint-disable-line no-sync
var defaultConfig = require('./default-config');

module.exports = command;

function command(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (!opts.args) {
    opts.args = [];
  }

  if (!opts.target) {
    opts.target = defaultConfig.destination;
  }

  var installPath = join(opts.target, defaultConfig.binName);

  try {
    statSync(installPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return cb('Missing ' + installPath);
    }

    throw err;
  }

  return startCommand(function(err) {
    if (err) {
      return cb(err);
    }

    return cb();
  });

  function startCommand(finishCommand) {
    var errors = '';
    var childProcess = spawn(installPath, opts.args);

    childProcess.stdout.setEncoding('utf8');
    childProcess.stdout.on('data', function(data) {
      process.stdout.write(data);
    });

    childProcess.stderr.on('data', function(data) {
      process.stdout.write(data);
      errors += data;
    });

    childProcess.on('error', function(err) {
      process.stdout.write(err);
      finishCommand(err);
    });

    childProcess.on('close', function() {
      if (errors) {
        return finishCommand(errors);
      }

      return finishCommand();
    });
  }
}

var async = require('async');
var join = require('path').join;
var spawn = require('child_process').spawn;
var checkPathExistence = require('./check-path-existence');
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

  var installPath = process.platform === 'win32' ? join(opts.target, 'theme.exe') : join(opts.target, 'theme');

  var tasks = [
    checkPathExistence.bind(null, installPath),
    startCommand.bind(null)
  ];

  async.series(tasks, function(err) {
    cb(err);
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
        finishCommand(errors);
        return;
      }

      finishCommand();
    });
  }
}

var join = require('path').join;
var spawn = require('child_process').spawn;
var statSync = require('fs').statSync; // eslint-disable-line no-sync
var defaultConfig = require('./default-config');
var noop = require('./noop');

module.exports = function command(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (typeof cb !== 'function') {
    cb = noop;
  }

  if (typeof opts === 'undefined') {
    opts = {};
  }

  if (!opts.args) {
    opts.args = [];
  }

  opts.args.unshift('--no-update-notifier');

  if (!opts.cwd) {
    opts.cwd = process.cwd();
  }

  var logger = require('./logger')(opts.logLevel);

  var installPath = join(defaultConfig.destination, defaultConfig.binName);

  logger.silly('Theme Kit command starting');

  statSync(installPath);

  var errors = '';
  var childProcess = spawn(installPath, opts.args, {
    cwd: opts.cwd
  });

  childProcess.stdout.setEncoding('utf8');
  if (logger.level >= 2) {
    childProcess.stdout.pipe(process.stdout);
  }

  childProcess.stderr.on('data', function(data) {
    errors += data;
  });

  childProcess.on('error', function(err) {
    throw err;
  });

  childProcess.on('close', function() {
    if (errors) {
      logger.error(errors);
      return cb(errors);
    }

    logger.silly('Theme Kit command finished');
    return cb();
  });
};

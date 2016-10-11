var join = require('path').join;
var spawn = require('child_process').spawn;
var statSync = require('fs').statSync; // eslint-disable-line no-sync
var defaultConfig = require('./default-config');
var noop = require('./noop');

function startCommand(command, args, logger, callback) {
  var errors = '';
  var childProcess = spawn(command, args);

  childProcess.stdout.setEncoding('utf8');

  childProcess.stdout.on('data', function(data) {
    logger.info(data);
  });

  childProcess.stderr.on('data', function(data) {
    errors += data;
  });

  childProcess.on('error', function(err) {
    throw err;
  });

  childProcess.on('close', function() {
    if (errors) {
      logger.error(errors);
      return callback(errors);
    }

    logger.silly('Theme Kit command finished');
    return callback();
  });
}

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

  var logger = require('./logger')(opts.logLevel);

  var installPath = join(defaultConfig.destination, defaultConfig.binName);

  logger.silly('Theme Kit command starting');

  statSync(installPath);

  return startCommand(installPath, opts.args, logger, cb);
};

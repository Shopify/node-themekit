const join = require('path').join;
const spawn = require('child_process').spawn;
const statSync = require('fs').statSync; // eslint-disable-line no-sync
const defaultConfig = require('./default-config');
const noop = require('./noop');

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

  const logger = require('./logger')(opts.logLevel);

  const installPath = join(defaultConfig.destination, defaultConfig.binName);

  logger.silly('Theme Kit command starting');

  statSync(installPath);

  let errors = '';
  const childProcess = spawn(installPath, opts.args, {
    cwd: opts.cwd
  });

  childProcess.stdout.setEncoding('utf8');
  childProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  childProcess.stderr.on('data', (data) => {
    errors += data;
  });

  childProcess.on('error', (err) => {
    throw err;
  });

  childProcess.on('close', () => {
    if (errors) {
      logger.error(errors);
      return cb(errors);
    }

    logger.silly('Theme Kit command finished');
    return cb();
  });
};

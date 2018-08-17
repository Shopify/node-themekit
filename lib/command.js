const join = require('path').join;
const spawn = require('child_process').spawn;
const statSync = require('fs').statSync;
const defaultConfig = require('./default-config');

function command(opts) {
  return new Promise((resolve, reject) => {
    if (!opts.args) {
      opts.args = [];
    }

    opts.args.push('--no-update-notifier');

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
        reject(errors);
      }

      logger.silly('Theme Kit command finished');
      resolve('Theme Kit command finished');
    });
  });
}

module.exports = command;

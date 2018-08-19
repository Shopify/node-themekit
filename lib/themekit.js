const join = require('path').join;
const spawn = require('child_process').spawn;
const statSync = require('fs').statSync;
const defaultConfig = require('./default-config');

const themekit = {
  command(opts) {
    return new Promise((resolve, reject) => {
      const forcedArgs = ['--no-update-notifier'];
      const args = opts.args.concat(forcedArgs) || forcedArgs;
      const cwd = opts.cwd || process.cwd();

      const logger = require('./logger')(opts.logLevel);
      const installPath = join(defaultConfig.destination, defaultConfig.binName);

      logger.silly('Theme Kit command starting');

      statSync(installPath);

      let errors = '';
      const childProcess = spawn(installPath, args, {cwd});

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
        resolve();
      });
    });
  }
};

module.exports = themekit;

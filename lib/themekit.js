const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

const defaultConfig = require('./default-config');
const logger = require('./logger')(2);
const {kebabCase} = require('./utils');

const themekit = {
  command(cmd, flags = {}, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
      const flags2 = Object.assign({}, flags, {noUpdateNotifier: true});

      const pathToExecutable = path.join(
        defaultConfig.destination,
        defaultConfig.binName,
      );
      fs.statSync(pathToExecutable);

      logger.silly('Theme Kit command starting');

      const args = objToArr(flags2);
      let errors = '';
      const childProcess = spawn(pathToExecutable, [cmd, ...args], {cwd});

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

function objToArr(obj) {
  return Object.keys(obj).reduce((arr, key) => {
    const flag = `--${kebabCase(key)}`;
    if (obj[key] === true) {
      return [...arr, flag];
    } else if (obj[key] === 'ignoredFiles') {
      const ignoredFiles =
        obj[key].reduce((files, file) => [...files, '--ignoredFile', file], []);
      return [...arr, ...ignoredFiles];
    } else {
      return [...arr, flag, obj[key]];
    }
  }, []);
}

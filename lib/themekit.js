const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

const defaultConfig = require('./default-config');
const logger = require('./logger')(2);
const {getFlagArrayFromObject} = require('./utils');

const themekit = {
  command(cmd, flagObj = {}, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
      const updatedFlagObj = Object.assign({}, flagObj, {noUpdateNotifier: true});
      const pathToExecutable = path.join(
        defaultConfig.destination,
        defaultConfig.binName,
      );
      fs.statSync(pathToExecutable);

      logger.silly('Theme Kit command starting');

      const flagArr = getFlagArrayFromObject(updatedFlagObj);
      let errors = '';
      const childProcess = spawn(pathToExecutable, [cmd, ...flagArr], {cwd});

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

const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

const config = require('./config');

function runExecutable(args, cwd, logLevel) {
  const logger = require('./logger')(logLevel);
  return new Promise((resolve, reject) => {
    logger.silly('Theme Kit command starting');
    let errors = '';

    const pathToExecutable = path.join(config.destination, config.binName);
    fs.statSync(pathToExecutable);

    const childProcess = spawn(pathToExecutable, args, {cwd});

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

module.exports = runExecutable;

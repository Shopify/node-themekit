#!/usr/bin/env node
const parsedArgv = require('minimist')(process.argv.slice(2));

const install = require('./install');
const logger = require('./logger')();
const runExecutable = require('./run-executable');

if (parsedArgv._[0] === 'install') {
  install(parsedArgv);
} else {
  runExecutable(process.argv.slice(2), process.cwd(), parsedArgv.logLevel)
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });
}

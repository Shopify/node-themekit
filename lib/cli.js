#!/usr/bin/env node
const parsedArgv = require('minimist')(process.argv.slice(2));

const install = require('./install');
const runExecutable = require('./process');

if (parsedArgv._[0] === 'install') {
  install(parsedArgv);
} else {
  const options = {
    args: process.argv.slice(2)
  };

  if (parsedArgv.logLevel) {
    options.logLevel = parsedArgv.logLevel;
  }

  const [cmd, ...args] = options;

  runExecutable(cmd, args);
}

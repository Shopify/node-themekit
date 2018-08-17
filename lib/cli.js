#!/usr/bin/env node

const install = require('./install');
const command = require('./command');
const parsedArgv = require('minimist')(process.argv.slice(2));

if (parsedArgv._[0] === 'install') {
  install(parsedArgv);
} else {
  const options = {
    args: process.argv.slice(2)
  };

  if (parsedArgv.logLevel) {
    options.logLevel = parsedArgv.logLevel;
  }

  command(options);
}

#!/usr/bin/env node

var install = require('./install');
var command = require('./command');
var parsedArgv = require('minimist')(process.argv.slice(2));

if (parsedArgv._[0] === 'install') {
  install(parsedArgv);
} else {
  var options = {
    args: process.argv.slice(2)
  };

  if (parsedArgv.logLevel) {
    options.logLevel = parsedArgv.logLevel;
  }

  command(options);
}

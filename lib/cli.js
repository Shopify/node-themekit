#!/usr/bin/env node
const parsedArgv = require('minimist')(process.argv.slice(2));

const install = require('./install');
const runExecutable = require('./run-executable');

if (parsedArgv._[0] === 'install') {
  install(parsedArgv);
} else {
  runExecutable(process.argv.slice(2), process.cwd(), parsedArgv.logLevel);
}

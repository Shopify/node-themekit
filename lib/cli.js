#!/usr/bin/env node

var install = require('./install');
var command = require('./command');
var argv = require('minimist')(process.argv.slice(2));

if (argv._[0] === 'install') {
  install(argv);
} else {
  command({
    args: process.argv.slice(2)
  });
}

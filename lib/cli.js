#!/usr/bin/env node

var install = require('./install');
var command = require('./command');

if (process.argv[2] === 'install') {
  install(require('minimist')(process.argv.slice(2)));
} else {
  command({
    args: process.argv.slice(2)
  });
}

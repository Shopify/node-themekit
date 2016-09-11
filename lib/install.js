var async = require('async');
var BinWrapper = require('bin-wrapper');
var checkPathExistenceAndRemove = require('./check-path-existence-remove');
var defaultConfig = require('./default-config');
var noop = require('./noop');

module.exports = install;

function install(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  var logger = opts.logger || noop;

  if (!opts.baseURL) {
    opts.baseURL = defaultConfig.baseURL;
  }

  if (!opts.version) {
    opts.version = defaultConfig.version;
  }

  if (!opts.destination) {
    opts.destination = defaultConfig.destination;
  }

  logger('Theme Kit installation starting\n');

  var installer = new BinWrapper()
    .src(opts.baseURL + '/releases/download/' + opts.version + '/darwin-amd64.zip', 'darwin')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/linux-386.zip', 'linux')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/linux-amd64.zip', 'linux', 'x64')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/windows-386.zip', 'win32')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/windows-amd64.zip', 'win32', 'x64')
    .dest(opts.destination)
    .use(process.platform === 'win32' ? 'theme.exe' : 'theme');

  var installPath = installer.path();

  var tasks = [
    checkPathExistenceAndRemove.bind(null, installPath),
    download.bind(null, installer),
    asyncLogEnd.bind(null, logger),
  ];

  async.series(tasks, function(err) {
    cb(err, installPath);
  });
}

function download(installer, cb) {
  installer.run(['version'], function(err) {
    if (err) {
      cb(err);
      return;
    }

    cb();
  });
}

function asyncLogEnd(logger, cb) {
  logger('Theme Kit installation finished\n');
  cb();
}

var BinWrapper = require('bin-wrapper');
var cleanInstallPath = require('./clean-install-path');
var defaultConfig = require('./default-config');
var noop = require('./noop');

module.exports = function install(opts, cb) {
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

  logger('Theme Kit installation starting');

  var urlAndPath = opts.baseURL + '/releases/download/' + opts.version;

  var installer = new BinWrapper()
    .src(urlAndPath + '/darwin-amd64.zip', 'darwin')
    .src(urlAndPath + '/linux-386.zip', 'linux')
    .src(urlAndPath + '/linux-amd64.zip', 'linux', 'x64')
    .src(urlAndPath + '/windows-386.zip', 'win32')
    .src(urlAndPath + '/windows-amd64.zip', 'win32', 'x64')
    .dest(opts.destination)
    .use(defaultConfig.binName);

  var installPath = installer.path();

  cleanInstallPath(installPath, function(err) {
    if (err) {
      return cb(err);
    }

    return installer.run(['version'], function(runErr) {
      if (runErr) {
        return cb(runErr);
      }

      logger('Theme Kit installation finished');
      return cb(null, installPath);
    });
  });
};

var BinWrapper = require('bin-wrapper');
var cleanInstallPath = require('./clean-install-path');
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

  logger('Theme Kit installation starting');

  var installer = new BinWrapper()
    .src(opts.baseURL + '/releases/download/' + opts.version + '/darwin-amd64.zip', 'darwin')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/linux-386.zip', 'linux')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/linux-amd64.zip', 'linux', 'x64')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/windows-386.zip', 'win32')
    .src(opts.baseURL + '/releases/download/' + opts.version + '/windows-amd64.zip', 'win32', 'x64')
    .dest(opts.destination)
    .use(defaultConfig.binName);

  var installPath = installer.path();

  cleanInstallPath(installPath, function() {
    installer.run(['version'], function(err) {
      if (err) {
        cb(err);
        return;
      }

      logger('Theme Kit installation finished');
      cb(null, installPath);
    });
  });
}

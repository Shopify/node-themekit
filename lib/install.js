var BinWrapper = require('bin-wrapper');
var cleanInstallPath = require('./clean-install-path');
var defaultConfig = require('./default-config');
var noop = require('./noop');
var spinner = require('simple-spinner');

module.exports = function install(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (typeof cb !== 'function') {
    cb = noop;
  }

  if (typeof opts === 'undefined') {
    opts = {};
  }

  var logger = require('./logger')(opts.logLevel);

  var urlAndPath = defaultConfig.baseURL + '/releases/download/' + defaultConfig.version;

  logger.silly('Theme Kit installation starting');
  spinner.start();

  var installer = new BinWrapper()
    .src(urlAndPath + '/darwin-amd64.zip', 'darwin')
    .src(urlAndPath + '/linux-386.zip', 'linux')
    .src(urlAndPath + '/linux-amd64.zip', 'linux', 'x64')
    .src(urlAndPath + '/windows-386.zip', 'win32')
    .src(urlAndPath + '/windows-amd64.zip', 'win32', 'x64')
    .dest(defaultConfig.destination)
    .use(defaultConfig.binName);

  var installPath = installer.path();

  return cleanInstallPath(installPath, function(err) {
    if (err) {
      throw err;
    }

    return installer.run(['version'], function(runErr) {
      if (runErr) {
        throw runErr;
      }

      spinner.stop();
      logger.info('Theme Kit path: ' + installPath);
      return cb(null, installPath);
    });
  });
};

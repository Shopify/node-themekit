const BinWrapper = require('bin-wrapper');
const spinner = require('simple-spinner');
const defaultConfig = require('./default-config');
const {cleanPath} = require('./utils');

function install(opts = {}) {
  return new Promise((resolve, reject) => {
    const logger = require('./logger')(opts.logLevel);
    const urlAndPath = `${defaultConfig.baseURL}/v${defaultConfig.version}`;

    logger.silly('Theme Kit installation starting');
    spinner.start();

    const installer = new BinWrapper()
      .src(`${urlAndPath}/darwin-amd64/theme`, 'darwin')
      .src(`${urlAndPath}/linux-386/theme`, 'linux')
      .src(`${urlAndPath}/linux-amd64/theme`, 'linux', 'x64')
      .src(`${urlAndPath}/windows-386/theme.exe`, 'win32')
      .src(`${urlAndPath}/windows-amd64/theme.exe`, 'win32', 'x64')
      .dest(defaultConfig.destination)
      .use(defaultConfig.binName);

    const installPath = installer.path();

    cleanPath(installPath);

    installer.run(['version'], (runErr) => {
      if (runErr) {
        reject();
      }

      spinner.stop();
      logger.info(`Theme Kit path: ${installPath}`);
      resolve();
    });
  });
}

module.exports = install;

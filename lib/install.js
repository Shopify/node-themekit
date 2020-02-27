const BinWrapper = require('bin-wrapper');
const spinner = require('simple-spinner');

const config = require('./config');
const {cleanFile} = require('./utils');

/**
 * Installs the Theme Kit executable into the bin/ subdirectory.
 * Call this on npm postinstall.
 * @param {string} logLevel   Log level
 */
async function install(logLevel) {
  const logger = require('./logger')(logLevel);
  const urlAndPath = `${config.baseURL}/v${config.version}`;

  logger.silly('Theme Kit installation starting');
  spinner.start();

  const installer = new BinWrapper()
    .src(`${urlAndPath}/darwin-amd64/theme`, 'darwin')
    .src(`${urlAndPath}/linux-386/theme`, 'linux')
    .src(`${urlAndPath}/linux-amd64/theme`, 'linux', 'x64')
    .src(`${urlAndPath}/windows-386/theme.exe`, 'win32')
    .src(`${urlAndPath}/windows-amd64/theme.exe`, 'win32', 'x64')
    .dest(config.destination)
    .use(config.binName);

  const pathToExecutable = installer.path();

  cleanFile(pathToExecutable);

  try {
    await installer.run(['version']);
    spinner.stop();
    logger.info(`Theme Kit path: ${pathToExecutable}`);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = install;

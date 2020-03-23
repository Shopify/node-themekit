const runExecutable = require('./run-executable');
const {getFlagArrayFromObject} = require('./utils');

const themekit = {

  /**
   * Runs a ThemeKit command with the runExecutable utility.
   * Forces the --no-update-notifier flag to prevent update messages from
   * appearing when `theme update` can't be run via CLI for this package.
   * @param {string} cmd        Theme Kit command to run
   * @param {Object} flagObj    flags for the Theme Kit command
   * @param {Object} options    additional options (cwd and logLevel)
   */
  command(cmd, flagObj = {}, options = {cwd: process.cwd()}) {
    const updatedFlagObj = {...flagObj, noUpdateNotifier: true};
    const flagArr = getFlagArrayFromObject(updatedFlagObj);

    return runExecutable(
      [cmd, ...flagArr],
      options.cwd,
      options.logLevel || null
    );
  }
};

module.exports = themekit;

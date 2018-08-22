const runExecutable = require('./run-executable');
const {getFlagArrayFromObject} = require('./utils');

const themekit = {
  command(cmd, flagObj = {}, options = {cwd: process.cwd()}) {
    const updatedFlagObj = Object.assign({}, flagObj, {noUpdateNotifier: true});
    const flagArr = getFlagArrayFromObject(updatedFlagObj);

    return runExecutable([cmd, ...flagArr], options.cwd, options.logLevel || null);
  }
};

module.exports = themekit;

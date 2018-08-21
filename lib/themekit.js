const runExecutable = require('./process');
const {getFlagArrayFromObject} = require('./utils');

const themekit = {
  command(cmd, flagObj = {}, cwd = process.cwd()) {
    const updatedFlagObj = Object.assign({}, flagObj, {noUpdateNotifier: true});
    const flagArr = getFlagArrayFromObject(updatedFlagObj);
    return runExecutable([cmd, ...flagArr], cwd);
  }
};

module.exports = themekit;

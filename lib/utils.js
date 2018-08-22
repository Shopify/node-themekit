const fs = require('fs');

/**
 * Deletes a file from the filesystem if it exists.
 * Does nothing if it doesn't do anything.
 * @param {string} pathToFile  path to file to delete
 */
function cleanFile(pathToFile) {
  try {
    fs.unlinkSync(pathToFile);
  } catch (err) {
    switch (err.code) {
      case 'ENOENT':
        return;
      default:
        throw new Error(err);
    }
  }
}

/**
 * Converts an object of obj[key] = value pairings into an
 * array that the Theme Kit executable can understand.
 * @param {Object} obj
 */
function getFlagArrayFromObject(obj) {
  return Object.keys(obj).reduce((arr, key) => {
    const flag = `--${_kebabCase(key)}`;
    if (typeof obj[key] === 'boolean') {
      return obj[key] ? [...arr, flag] : arr;
    } else if (key === 'ignoredFiles') {
      const ignoredFiles =
        obj[key].reduce((files, file) => [...files, '--ignored-file', file], []);
      return [...arr, ...ignoredFiles];
    } else {
      return [...arr, flag, obj[key]];
    }
  }, []);
}

/**
 * Converts camelCase text into kebab-case.
 * @param {string} str camelCase string to convert
 */
function _kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

module.exports = {cleanFile, getFlagArrayFromObject};

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
    const flag = `--${key.toLowerCase()}`;
    if (key === 'noUpdateNotifier' && typeof obj[key] === 'boolean') {
      return obj[key] ? [...arr, '--no-update-notifier'] : arr;
    } else if (key === 'noIgnore' && typeof obj[key] === 'boolean') {
      return obj[key] ? [...arr, '--no-ignore'] : arr;
    } else if (key === 'allowLive' && typeof obj[key] === 'boolean') {
      return obj[key] ? [...arr, '--allow-live'] : arr;
    } else if (typeof obj[key] === 'boolean') {
      return obj[key] ? [...arr, flag] : arr;
    } else if (key === 'ignoredFile') {
      return [...arr, '--ignored-file', obj[key]];
    } else if (key === 'ignoredFiles') {
      const ignoredFiles = obj[key].reduce(
        (files, file) => [...files, '--ignored-file', file],
        []
      );
      return [...arr, ...ignoredFiles];
    } else if (key === 'files') {
      return [...arr, ...obj[key]];
    } else {
      return [...arr, flag, obj[key]];
    }
  }, []);
}

module.exports = {cleanFile, getFlagArrayFromObject};

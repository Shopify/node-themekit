const fs = require('fs');

function cleanPath(installPath) {
  try {
    fs.unlinkSync(installPath);
  } catch (err) {
    switch (err.code) {
      case 'ENOENT':
        return;
      default:
        throw new Error(err);
    }
  }
}

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

function _kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

module.exports = {cleanPath, getFlagArrayFromObject};

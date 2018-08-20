const fs = require('fs');

const utils = {
  cleanPath(installPath) {
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
  },
  kebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  },
};

module.exports = utils;

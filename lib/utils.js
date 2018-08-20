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
};

module.exports = utils;

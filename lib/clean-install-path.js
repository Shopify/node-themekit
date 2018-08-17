const fs = require('fs');

module.exports = function cleanInstallPath(installPath, cb) {
  return fs.stat(installPath, (err) => {
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          return cb();
        default:
          return cb(err);
      }
    }

    try {
      return fs.unlink(installPath, () => {
        return cb();
      });
    } catch (unlinkErr) {
      return cb(unlinkErr);
    }
  });
};

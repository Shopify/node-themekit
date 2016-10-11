var fs = require('fs');

module.exports = function cleanInstallPath(installPath, cb) {
  return fs.stat(installPath, function(err) {
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          return cb();
        default:
          return cb(err);
      }
    }

    try {
      return fs.unlink(installPath, function() {
        return cb();
      });
    } catch (unlinkErr) {
      return cb(unlinkErr);
    }
  });
};

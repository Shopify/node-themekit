var fs = require('fs');

module.exports = cleanInstallPath;

function cleanInstallPath(installPath, cb) {
  fs.stat(installPath, function(err) {
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          return cb();
        default:
          return cb(err);
      }
    }

    return fs.unlink(installPath, function() {
      return cb();
    });
  });
}

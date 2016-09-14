var fs = require('fs');

module.exports = cleanInstallPath;

function cleanInstallPath(installPath, cb) {
  fs.stat(installPath, function(err) {
    if (err === null) {
      fs.unlink(installPath, function() {
        cb();
        return;
      });

      return;
    }

    cb();
  });
}

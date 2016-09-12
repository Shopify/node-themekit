var fs = require('fs');

module.exports = checkPathExistenceAndRemove;

function checkPathExistenceAndRemove(path, cb) {
  fs.stat(path, function(err) {
    if (err === null) {
      fs.unlink(path, function() {
        cb();
        return;
      });

      return;
    }

    cb();
  });
}

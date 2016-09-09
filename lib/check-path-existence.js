var fs = require('fs');

module.exports = checkPathExistence;

function checkPathExistence(path, cb) {
  fs.stat(path, function(err) {
    if (err === null) {
      cb();
      return;
    }

    cb('Missing ' + path + '\n');
  });
}

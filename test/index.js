var assert = require('assert');
var fs = require('fs');
var join = require('path').join;
var pkg = require('../package.json');
var themekitPath = process.platform === 'win32' ? join(__dirname, '..', 'bin', 'theme.exe') : join(__dirname, '..', 'bin', 'theme');
var themekit = require('..');

describe('Theme Kit install', function() {
  beforeEach(function(done) {
    themekit.install(function() {
      done();
    });
  });

  it('reinstalls binary', function(done) {
    var originalCTime = fs.statSync(themekitPath).ctime.getTime(); // eslint-disable-line no-sync

    themekit.install(function() {
      var newCTime = fs.statSync(themekitPath).ctime.getTime(); // eslint-disable-line no-sync
      assert.notEqual(originalCTime, newCTime, 'created at times are not equal');
      done();
    });
  });

  it('matches package and binary version', function(done) {
    themekit.command({
      args: ['version'],
    }, function() {
      assert.equal(pkg.version, newCTime, 'created at times are not equal');
      done();
    });
  });
});

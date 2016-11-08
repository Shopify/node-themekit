var join = require('path').join;
var pkg = require('../package.json');

module.exports = {
  baseURL: 'https://shopify-themekit.s3.amazonaws.com',
  version: pkg.version,
  destination: join(__dirname, '..', 'bin'),
  binName: process.platform === 'win32' ? 'theme.exe' : 'theme'
};

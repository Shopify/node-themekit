var join = require('path').join;
var pkg = require('../package.json');

module.exports = {
  baseURL: 'https://github.com/Shopify/themekit',
  version: pkg.version,
  destination: join(__dirname, '..', 'bin'),
};

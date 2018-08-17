const join = require('path').join;

module.exports = {
  baseURL: 'https://shopify-themekit.s3.amazonaws.com',
  version: '0.7.5',
  destination: join(__dirname, '..', 'bin'),
  binName: process.platform === 'win32' ? 'theme.exe' : 'theme'
};

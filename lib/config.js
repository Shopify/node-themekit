const path = require('path');

module.exports = {
  baseURL: 'https://shopify-themekit.s3.amazonaws.com',
  version: '0.8.0',
  destination: path.join(__dirname, '..', 'bin'),
  binName: process.platform === 'win32' ? 'theme.exe' : 'theme'
};

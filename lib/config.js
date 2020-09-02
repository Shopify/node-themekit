const path = require('path');

module.exports = {
  baseURL: 'https://shopify-themekit.s3.amazonaws.com',
  version: '1.1.1',
  destination: path.join(__dirname, '..', 'bin'),
  binName: process.platform === 'win32' ? 'theme.exe' : 'theme'
};

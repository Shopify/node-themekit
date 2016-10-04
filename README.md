# Theme Kit

Node version of Theme Kit

## Table Of Contents

- [Installation](#installation)
- [Examples](#examples)
- [API](#api)
    + [`install(options, callback)`](#themekitinstall)
    + [`commands(options, callback)`](#themekitcommandsargs)
- [License](http://github.com/Shopify/node-themekit/blob/master/LICENSE.md)

## Installation
```bash
$ npm install node-themekit
```

## Examples

#### Install binary

Programatically install Theme Kit binary.

```javascript
var install = require('node-themekit').install;

install({
  logger: console.log
}, function(err, path) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Theme Kit has been installed: ' + path);
});
```

#### Run commands

Run Theme Kit commands.

```javascript
var command = require('node-themekit').command;

// prints themekit version information
command({
  args: ['version']
}, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Theme Kit command has completed.');
});

// remove specific files from development environment
command({
  args: ['remove', '-env', 'development', 'snippets/pagination.liquid', 'snippets/date.liquid']
}, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Theme Kit command has completed.');
});

// deploy all files to development environment
command({
  args: ['deploy', '-env', 'development']
}, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Theme Kit command has completed.');
});
```

## API

#### `themekit.install(options, callback)`

Installs Theme Kit binary based on operating system and architecture.

- options `<Object>`

  ```javascript
  {
    logger: <Function>, // function to output additional info | console.log
    baseURL: <String>, // base path to Theme Kit repo | 'https://github.com/Shopify/themekit'
    version: <String>, // version of Theme Kit to install | '0.4.1'
    destination: <String> // path to Theme Kit binary will be installed | '/Users/shopify/node-themekit/bin/'
  }
  ```

- callback `<Function>`

#### `themekit.commands(options, callback)`

Executes command with arguments using the Theme Kit binary.

- options `<Object>`

  ```javascript
  {
    target: <String>, // path to Theme Kit binary is located | '/Users/shopify/node-themekit/bin/theme'
    args: <Array> // arguments to execute | ['version']
  }
  ```

- callback `<Function>`

For a complete list of commands and args: [http://themekit.cat/docs/](http://themekit.cat/docs/).

## License

MIT, see [LICENSE.md](http://github.com/Shopify/node-themekit/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />

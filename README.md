[![npm version](https://badge.fury.io/js/%40shopify%2Fthemekit.svg)](https://badge.fury.io/js/%40shopify%2Fthemekit)

# @shopify/themekit

Node wrapper for [Theme Kit](http://shopify.github.io/themekit/).


## Table Of Contents

- [Installation](#installation)
- [Examples](#examples)
- [API](#api)
- [CLI](#cli)
- [License](http://github.com/Shopify/node-themekit/blob/master/LICENSE.md)

## Installation

```bash
$ npm install @shopify/themekit
```

## Usage
```javascript
const themeKit = require('@shopify/themekit');

await themeKit.command('version');
//=> ThemeKit 0.8.1 darwin/amd64
```

## Examples

### Run commands

This wrapper exposes a single function in its API which allows it to run any command available in the original Theme Kit CLI. Here are a collection of examples to run Theme Kit commands.

For a complete list of commands and args: [shopify.github.io/themekit/commands](http://shopify.github.io/themekit/commands).


#### Example 1

Remove specific files from development environment.

```javascript
const themeKit = require('@shopify/themekit');

await themeKit.command('remove', {
  env: 'development',
  files: ['snippets/pagination.liquid', 'snippets/date.liquid']
});
```

#### Example 3

Deploy all files to staging environment.

```javascript
const themeKit = require('@shopify/themekit');

themeKit.command('deploy', {
  env: 'staging'
});
```

#### Example 4

Deploy theme to production via NPM scripts.

**Warning:** This example will overwrite the theme based on your `config.yml`.

```json
"dependencies": {
  "@shopify/themekit": "1.0.0"
},
"scripts": {
  "deploy": "shopify-themekit replace --env production"
}
```

## API

### `command(command[, flags][, options)`

Executes command with arguments using the Theme Kit binary.

- command `<String>`

  Theme Kit command to run.

- flags `<Object>`

  Flags to pass into the command.
  
  All flags specified in the Theme Kit documentation are available, but in `camelCase` rather than in `--flagform`.
  ```javascript
  {
    noIgnore: true, // --no-ignore
    env: 'development' // --env=development
  }
  ```

  Additional flags:
  - `files`: Specify an array of target files to upload.
  - `ignoredFiles`: Like `ignoredFile`, but takes in an array of files to ignore.


- options `<Object>`

  ```javascript
  {
    cwd: <String>,      // Hard-code a working directory to run the binary from
    logLevel: <String> // Set level additional output info | 'silent', 'error', 'all', 'silly'
  }
  ```

For a complete list of commands and flags, see the [Theme Kit documentation](http://shopify.github.io/themekit/commands/).

## CLI
```bash
$ shopify-themekit <args>
```

This CLI component of this package is intended to be used with NPM scripts. It functions exactly the same as the original Theme Kit binary. If you plan on using the command line interface heavily, please refer to [the original Theme Kit repository](http://shopify.github.io/themekit).

## Contributing

### Releases

This information is for project maintainers:

Instructions

- Use [`npm version <major|minor|patch>`](https://docs.npmjs.com/cli/version) to update the version in `package.json` and `package-lock.json`.
- Push the changes and the tag with `git push --follow-tags`
- Open new PR corresponding to the new release, and merge once approved.
- Release to npmjs.com by triggering a Shipit deploy of the master branch.
- Visit https://www.npmjs.com/package/@shopify/themekit to confirm the new version is listed.
- Create a release on GitHub.

## License

MIT, see [LICENSE.md](http://github.com/Shopify/node-themekit/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />

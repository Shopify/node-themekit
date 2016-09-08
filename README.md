# Theme Kit

Node version of Theme Kit

## Table Of Contents

- [Installation](#installation)
- [Examples](#examples)
- [API](#api)
    + [`install()`](#themekitinstall)
    + [`commands(args)`](#themekitcommandsargs)
- [License](http://github.com/Shopify/node-themekit/blob/master/LICENSE.md)

## Installation
```bash
$ npm install node-themekit
```

## Examples

#### Install binary

Programatically install Theme Kit binary.

```javascript
import {install} from 'node-themekit';

install(); // installs binary to ./node_modules/node-themekit/.bin
```

#### Example 2

Run Theme Kit commands.

```javascript
import {commands} from 'node-themekit';

// remove specific files from development environment
commands(['remove', '-env', 'development', 'snippets/pagination.liquid', 'snippets/date.liquid']);

// upload specific files to development environment
commands(['upload', '-env', 'development', 'snippets/pagination.liquid']);

// deploy all files to development environment
commands(['deploy', '-env', 'development']);
```

## API

#### `themekit.install()`

Installs Theme Kit binary based on operating system and architecture. Returns a promise with path to binary.

#### `themekit.commands(args)`

Executes command with arguments using the Theme Kit binary. Resolves promise when completed.

For a complete list of commands and args: [http://themekit.cat/docs/](http://themekit.cat/docs/).

## License

MIT, see [LICENSE.md](http://github.com/Shopify/node-themekit/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />

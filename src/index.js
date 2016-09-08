import Promise from 'bluebird';
import BinWrapper from 'bin-wrapper';
import {unlink, stat} from 'fs';
import {join} from 'path';
import {spawn} from 'child_process';

const pkg = require('../package.json');

const statAsync = Promise.promisify(stat);
const unlinkAsync = Promise.promisify(unlink);

const repo = 'https://github.com/Shopify/themekit';
const version = pkg.version;
const destination = join(__dirname, '..', '.bin');

let _themeKitBin = {};

/**
 * Uses BinWrapper instance and executes version command
 * to test the ThemeKit binary.
 *
 * @returns {Promise:String} - The ThemeKit installation
 */
export function install() {
  _initialize();

  return _test()
    .then((exists) => {
      if (!exists) {
        return Promise.resolve();
      }

      return _getPath()
        .then((binPath) => {
          return unlinkAsync(binPath);
        });
    })
    .then(() => {
      return _getBin();
    })
    .then((bin) => {
      return new Promise((resolve, reject) => {
        process.stdout.write(_fetching());

        bin.run(['version'], (err) => {
          if (err) {
            reject(err);
          } else {
            process.stdout.write(_success());
            resolve(_getPath());
          }
        });
      });
    });
}

/**
 * Uses child_process to spawn a new thread and
 * executes the command with the local ThemeKit
 * binary.
 *
 * @param args {Object} - The command and additional args to execute.
 * @returns {Promise} - The child_process stream
 */
export function commands(args = {}) {
  _initialize();

  let error = '';

  return _test()
    .then((exists) => {
      if (!exists) {
        throw new Error(_missing());
      }

      return _getPath();
    })
    .then((binPath) => {
      const childProcess = spawn(binPath, args);

      return new Promise((resolve, reject) => {
        childProcess.stdout.setEncoding('utf8');
        childProcess.stdout.on('data', (data) => {
          process.stdout.write(data);
        });

        childProcess.stderr.on('data', (data) => {
          process.stdout.write(data);
          error += data;
        });

        childProcess.on('error', (err) => {
          process.stdout.write(err);
          reject(err);
        });

        childProcess.on('close', () => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve();
          }
        });
      });
    });
}

/**
 * Sync setup for ThemeKit
 *
 * @private
 */
function _initialize() {
  _setBin(destination);
}

/**
 * Initializes BinWrapper
 *
 * @private
 */
function _setBin(binDestination) {
  _themeKitBin = new BinWrapper()
    .src(`${repo}/releases/download/${version}/darwin-amd64.zip`, 'darwin')
    .src(`${repo}/releases/download/${version}/linux-386.zip`, 'linux')
    .src(`${repo}/releases/download/${version}/linux-amd64.zip`, 'linux', 'x64')
    .src(`${repo}/releases/download/${version}/windows-386.zip`, 'win32')
    .src(`${repo}/releases/download/${version}/windows-amd64.zip`, 'win32', 'x64')
    .dest(binDestination)
    .use(process.platform === 'win32' ? 'theme.exe' : 'theme');
}

/**
 * Uses BinWrapper to fetch the ThemeKit binary based on
 * system and architecture. The binary gets stored in
 * slate-cli bin.
 *
 * @returns {Promise:Object} - BinWrapper instance for ThemeKit
 *
 * @private
 */
function _getBin() {
  return Promise.resolve(_themeKitBin);
}

/**
 * Resolves the path to local ThemeKit binary.
 *
 * @returns {Promise:String} - The path to ThemeKit
 *
 * @private
 */
function _getPath() {
  return _getBin()
    .then((bin) => {
      return Promise.resolve(bin.path());
    });
}

/**
 * Tests if ThemeKit binary exists.
 *
 * @returns {Promise:Boolean} - If ThemeKit exists
 *
 * @private
 */
function _test() {
  let exists = true;

  return _getPath()
    .then((binPath) => {
      return statAsync(binPath);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        exists = false;
      } else {
        throw new Error(err);
      }
    })
    .then(() => {
      return exists;
    });
}

/**
 * ThemeKit successfully installed
 *
 * @returns {String}
 *
 * @private
 */
function _success() {
  return 'ThemeKit successfully installed\n';
}

/**
 * Fetching ThemeKit
 *
 * @returns {String}
 *
 * @private
 */
function _fetching() {
  return 'Fetching ThemeKit...\n';
}

/**
 * ThemeKit missing. Please re-run install
 *
 * @returns {String}
 *
 * @private
 */
function _missing() {
  return 'ThemeKit missing. Please re-run install\n';
}

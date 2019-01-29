const path = require('path');
const cfg = require('../lib/config');
const themekit = require('../lib/themekit');

jest.mock('child_process');

describe('themekit', () => {
  test('configure', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('configure', {
      password: 'test',
      store: 'test.myshopify.com',
      themeid: 65905950820
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'configure',
        '--password',
        'test',
        '--store',
        'test.myshopify.com',
        '--themeid',
        65905950820,
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('deploy', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('deploy');

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['deploy', '--no-update-notifier'],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('deploy ignore files', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('deploy', {
      ignoredFile: ['templates/404.liquid', 'templates/article.liquid']
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'deploy',
        '--ignored-file',
        'templates/404.liquid',
        '--ignored-file',
        'templates/article.liquid',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('deploy all environments no delete', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('deploy', {
      allenvs: true,
      nodelete: true
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['deploy', '--allenvs', '--nodelete', '--no-update-notifier'],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('download', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('download');

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['download', '--no-update-notifier'],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('download few files', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('download', {
      files: ['templates/404.liquid', 'templates/article.liquid']
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'download',
        'templates/404.liquid',
        'templates/article.liquid',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('download few files', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('download', {
      files: ['templates/404.liquid', 'templates/article.liquid']
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'download',
        'templates/404.liquid',
        'templates/article.liquid',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('get list', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('get', {
      list: true,
      password: 'test',
      store: 'test.myshopify.com'
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'get',
        '--list',
        '--password',
        'test',
        '--store',
        'test.myshopify.com',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('get theme', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('get', {
      password: 'test',
      store: 'test.myshopify.com',
      themeid: 123
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'get',
        '--password',
        'test',
        '--store',
        'test.myshopify.com',
        '--themeid',
        123,
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('new theme', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('new', {
      password: 'test',
      store: 'test.myshopify.com',
      name: 'Magnificent Theme'
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'new',
        '--password',
        'test',
        '--store',
        'test.myshopify.com',
        '--name',
        'Magnificent Theme',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('open all flags', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('open', {
      allenvs: true,
      browser: 'google-chrome',
      edit: true
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'open',
        '--allenvs',
        '--browser',
        'google-chrome',
        '--edit',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('remove files all envs', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('remove', {
      files: ['templates/404.liquid', 'templates/article.liquid'],
      allenvs: true
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'remove',
        'templates/404.liquid',
        'templates/article.liquid',
        '--allenvs',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });

  test('watch all flags', async () => {
    const {spawn} = require('child_process');

    const pathToExecutable = path.join(cfg.destination, cfg.binName);
    const cwd = process.cwd();

    await themekit.command('watch', {
      notify: true,
      allenvs: true
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['watch', '--notify', '--allenvs', '--no-update-notifier'],
      {
        cwd,
        stdio: 'inherit'
      }
    );
  });
});

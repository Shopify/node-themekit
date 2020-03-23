const path = require('path');
const {spawn} = require('child_process');

const cfg = require('../lib/config');
const themekit = require('../lib/themekit');

jest.mock('child_process');
const pathToExecutable = path.join(cfg.destination, cfg.binName);
const cwd = process.cwd();

describe('themekit', () => {
  test('configure', async () => {
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('deploy', async () => {
    await themekit.command('deploy');

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['deploy', '--no-update-notifier'],
      {
        cwd,
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('deploy ignore files', async () => {
    await themekit.command('deploy', {
      ignoredFiles: ['templates/404.liquid', 'templates/article.liquid']
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('deploy ignore files', async () => {
    await themekit.command('deploy', {
      noIgnore: true
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['deploy', '--no-ignore', '--no-update-notifier'],
      {
        cwd,
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('deploy ignore files and ignore file', async () => {
    await themekit.command('deploy', {
      ignoredFiles: ['templates/404.liquid', 'templates/article.liquid'],
      ignoredFile: 'templates/403.liquid'
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      [
        'deploy',
        '--ignored-file',
        'templates/404.liquid',
        '--ignored-file',
        'templates/article.liquid',
        '--ignored-file',
        'templates/403.liquid',
        '--no-update-notifier'
      ],
      {
        cwd,
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('deploy all environments no delete', async () => {
    await themekit.command('deploy', {
      allEnvs: true,
      noDelete: true
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['deploy', '--allenvs', '--nodelete', '--no-update-notifier'],
      {
        cwd,
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('download', async () => {
    await themekit.command('download');

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['download', '--no-update-notifier'],
      {
        cwd,
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('download few files', async () => {
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('get list', async () => {
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('get theme', async () => {
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('new theme', async () => {
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('open all flags', async () => {
    await themekit.command('open', {
      allEnvs: true,
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('remove files all envs', async () => {
    await themekit.command('remove', {
      files: ['templates/404.liquid', 'templates/article.liquid'],
      allEnvs: true
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
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });

  test('watch all flags', async () => {
    await themekit.command('watch', {
      notify: true,
      allEnvs: true
    });

    expect(spawn).toBeCalledWith(
      pathToExecutable,
      ['watch', '--notify', '--allenvs', '--no-update-notifier'],
      {
        cwd,
        stdio: ['inherit', 'inherit', 'pipe']
      }
    );
  });
});

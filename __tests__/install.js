// these exports only exist in the mock
const {src, dest, path, run, use} = require('bin-wrapper');

const install = require('../lib/install');

jest.mock('../lib/utils');
jest.mock('../lib/logger', () => {
  return () => ({
    error: jest.fn(),
    info: jest.fn(),
    silly: jest.fn()
  });
});
jest.mock('../lib/config', () => {
  return {
    baseURL: 'example.com',
    version: '0.0.0',
    destination: 'myDir',
    binName: 'bin'
  };
});

describe('install', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns a promise with undefined return value', () => {
    expect(install()).resolves.toBeUndefined();
  });

  test('correctly sources bin files', async () => {
    await install();

    expect(src).toHaveBeenCalledWith('example.com/v0.0.0/darwin-amd64/theme', 'darwin');
    expect(src).toHaveBeenCalledWith('example.com/v0.0.0/linux-386/theme', 'linux');
    expect(src).toHaveBeenCalledWith('example.com/v0.0.0/linux-amd64/theme', 'linux', 'x64');
    expect(src).toHaveBeenCalledWith('example.com/v0.0.0/windows-386/theme.exe', 'win32');
    expect(src).toHaveBeenCalledWith('example.com/v0.0.0/windows-amd64/theme.exe', 'win32', 'x64');
    expect(src).toHaveBeenCalledTimes(5);
  });

  test('correctly applies destination', async () => {
    await install();

    expect(dest).toHaveBeenCalledWith('myDir');
    expect(dest).toHaveBeenCalledTimes(1);
  });

  test('correctly applies binary name', async () => {
    await install();
    expect(use).toHaveBeenCalledWith('bin');
    expect(use).toHaveBeenCalledTimes(1);
  });

  test('gets path', async () => {
    await install();
    expect(path).toHaveBeenCalledWith();
    expect(path).toHaveBeenCalledTimes(1);
  });

  test('runs after installation', async () => {
    await install();
    expect(run).toHaveBeenCalledWith(['version']);
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('runs after installation', async () => {
    await install();
    expect(run).toHaveBeenCalledWith(['version']);
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('rejects promise if error in installation run', async () => {
    const errorMessage = 'some err';
    run.mockRejectedValue(errorMessage);

    expect.assertions(1);
    try {
      await install();
    } catch (err) {
      expect(err.message).toMatch(errorMessage);
    }
  });
});

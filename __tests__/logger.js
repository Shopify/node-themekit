const logger = require('../lib/logger');

const originalConsole = global.console;

describe('logger', () => {
  beforeAll(() => {
    global.console = {log: jest.fn()};
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    global.console = originalConsole;
  });

  test('imported function returns logger functions', () => {
    const log = logger();
    expect(log).toHaveProperty('error', expect.any(Function));
    expect(log).toHaveProperty('info', expect.any(Function));
    expect(log).toHaveProperty('silly', expect.any(Function));
  });

  test('logs error at log level 0', () => {
    const log = logger('silent');
    const str = 'hello';
    const {error, info, silly} = log;

    error(str);
    info(str, str);
    silly(str, str, str);

    expect(log.level).toBe(0);
    expect(console.log).not.toHaveBeenCalled();
  });

  test('logs error at log level 1', () => {
    const log = logger('error');
    const str = 'hello';
    const {error, info, silly} = log;

    error(str);
    expect(console.log).toHaveBeenNthCalledWith(1, str);
    info(str, str);
    silly(str, str, str);
    expect(console.log).toHaveBeenCalledTimes(1);

    expect(log.level).toBe(1);
  });

  test('logs error and info at log level 2', () => {
    const log = logger('info');
    const str = 'hello';
    const {error, info, silly} = log;

    error(str);
    expect(console.log).toHaveBeenNthCalledWith(1, str);
    info(str, str);
    expect(console.log).toHaveBeenNthCalledWith(2, str, str);
    silly(str, str, str);
    expect(console.log).toHaveBeenCalledTimes(2);

    expect(log.level).toBe(2);
  });

  test('logs error, info, and silly at log level 3', () => {
    const log = logger('silly');
    const str = 'hello';
    const {error, info, silly} = log;

    error(str);
    expect(console.log).toHaveBeenNthCalledWith(1, str);
    info(str, str);
    expect(console.log).toHaveBeenNthCalledWith(2, str, str);
    silly(str, str, str);
    expect(console.log).toHaveBeenNthCalledWith(3, str, str, str);
    expect(console.log).toHaveBeenCalledTimes(3);

    expect(log.level).toBe(3);
  });

  test('defaults to level 2 without input parameters', () => {
    const log = logger();
    const str = 'hello';
    const {error, info, silly} = log;

    error(str);
    expect(console.log).toHaveBeenNthCalledWith(1, str);
    info(str, str);
    expect(console.log).toHaveBeenNthCalledWith(2, str, str);
    silly(str, str, str);
    expect(console.log).toHaveBeenCalledTimes(2);

    expect(log.level).toBe(2);
  });
});

let oldPlatform;

describe('config', () => {
  beforeEach(() => {
    oldPlatform = process.platform;
  });

  afterEach(() => {
    Object.defineProperty(process, 'platform', {
      value: oldPlatform
    });
  });

  test('appends .exe to binary if win32 platform', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32'
    });

    // require config after setting mock platform
    const config = require('../lib/config');

    expect(config.binName).toBe('theme.exe');
  });
});

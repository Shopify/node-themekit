module.exports = {
  spawn: jest.fn(() => ({
    on: jest.fn((evt, cb) => {
      if (evt === 'close') {
        return cb();
      }
      return () => { /* noop*/ };
    }),
    stdout: {
      setEncoding: jest.fn(),
      on: jest.fn()
    },
    stderr: {
      on: jest.fn()
    },
    addListener: jest.fn()
  }))
};

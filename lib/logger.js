module.exports = function logger(logLevel) {
  let level;

  switch (logLevel) {
    case 'silent':
      level = 0;
      break;
    case 'error':
      level = 1;
      break;
    case 'info':
      level = 2;
      break;
    case 'silly':
      level = 3;
      break;
    default:
      level = 2;
  }

  return {
    level,
    error(...args) {
      if (level >= 1) {
        console.log(...args);
      }
    },
    info(...args) {
      if (level >= 2) {
        console.log(...args);
      }
    },
    silly(...args) {
      if (level >= 3) {
        console.log(...args);
      }
    }
  };
};

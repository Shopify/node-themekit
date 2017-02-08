module.exports = function logger(logLevel) {
  var level = 2;

  switch (logLevel) {
    case 'silent':
      level = 0;
      break;
    case 'error':
      level = 1;
      break;
    case 'all':
      level = 2;
      break;
    case 'silly':
      level = 3;
      break;
    default:
      level = 2;
  }

  return {
    level: level,
    info: function() {
      if (level >= 2) {
        console.log.apply(console, arguments);
      }
    },

    error: function() {
      if (level >= 1) {
        console.error.apply(console, arguments);
      }
    },

    silly: function() {
      if (level >= 3) {
        console.log.apply(console, arguments);
      }
    }
  };
};

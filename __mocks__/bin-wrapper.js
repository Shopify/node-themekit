/* eslint-disable no-use-before-define */
const src = jest.fn(() => binWrapperObject);
const dest = jest.fn(() => binWrapperObject);
const path = jest.fn(() => binWrapperObject);
const run = jest.fn(async () => {
  return binWrapperObject;
});
const use = jest.fn(() => binWrapperObject);

const binWrapperObject = {src, dest, path, run, use};

module.exports = jest.fn().mockImplementation(() => binWrapperObject);
module.exports.src = src;
module.exports.dest = dest;
module.exports.path = path;
module.exports.run = run;
module.exports.use = use;

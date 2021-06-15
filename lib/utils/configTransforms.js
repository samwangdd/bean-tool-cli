const stringifyJS = require('./stringifyJS');

const transformJS = {
  read: ({ filename, context }) => {
    try {
      return require(`./${filename}`, context, true); // require 有哪些参数？？
    } catch (error) {}
  },
  write: ({ value }) => `module.exports = ${stringifyJS(value, null, 4)}`,
};

const transformJSON = {
  read: () => {},
  write: () => {},
};

const transformYAML = {
  read: () => {},
  write: () => {},
};

const transformLines = {
  read: () => {},
  write: () => {},
};

module.exports = {
  js: transformJS,
  json: transformJSON,
  yaml: transformYAML,
  lines: transformLines,
};

const fs = require('fs');
const cloneDeep = require('lodash.clonedeep');
const { getRcPath } = require('./rcPath');
const { error } = require('./logger');

const rcPath = getRcPath('.mvcrc');

exports.defaultProps = {
  features: ['babel', 'linter'],
  historyMode: false,
  eslintConfig: 'airbnb',
  lintOn: ['save'],
};

exports.defaults = {
  presets: {
    default: { ...exports.defaultProps },
  },
};

let cachedOptions;

exports.loadOptions = () => {
  if (cachedOptions) {
    return cachedOptions;
  }
  if (fs.existsSync(rcPath)) {
    try {
      cachedOptions = JSON.parse(fs.readFileSync(rcPath, 'utf-8'));
    } catch (e) {
      error(
        `Error loading saved preferences: ` +
          `~/.mvcrc may be corrupted or have syntax errors. ` +
          `Please fix/delete it and re-run vue-cli in manual mode.\n` +
          `(${e.message})`,
      );
    }
    return cachedOptions;
  }
  return {};
};

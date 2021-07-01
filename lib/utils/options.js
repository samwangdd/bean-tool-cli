const fs = require('fs');
const cloneDeep = require('lodash.clonedeep');
const { getRcPath } = require('./rcPath');
const { error } = require('./logger');

const rcPath = getRcPath('.mvcrc');
exports.rcPath = getRcPath('.mvcrc');

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

/**
 * 保存预设
 * @param {String} name 名称
 * @param {Object}} preset 预设配置
 * @returns {Boolean} 保存成功
 */
exports.savePreset = (name, preset) => {
  preset = filter(preset);
  const presets = cloneDeep(exports.loadOptions().presets || {});
  presets[name] = preset;

  return exports.saveOptions({ presets });
};

/**
 * 保存配置
 * @param {object} saveOption 配置项
 * @returns {boolean} 保存配置成功
 */
exports.saveOptions = saveOption => {
  const options = Object.assign(cloneDeep(exports.loadOptions()), saveOption);
  for (const key in options) {
    if (!(key in exports.defaults)) {
      delete options[key];
    }
  }
  cachedOptions = options;
  try {
    // TODO: JSON.stringify 的几个参数含义
    fs.writeFileSync(rcPath, JSON.stringify(options, null, 2));
    return true;
  } catch (e) {
    error(
      `Error saving preferences: ` +
        `make sure you have write access to ${rcPath}.\n` +
        `(${e.message})`,
    );
  }
};

/**
 * 过滤 preset 关键属性
 *
 * @param {object} preset
 * @param {string[]} keys 属性集合
 * @return {object} preset
 */
function filter(preset, keys = ['preset', 'save', 'saveName', 'packageManager']) {
  preset = { ...preset };
  keys.forEach(key => {
    delete preset[key];
  });

  return preset;
}

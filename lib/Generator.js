const ConfigTransform = require('./ConfigTransform');

const isObject = value => value && typeof value === 'object';

const defaultConfigTransforms = {
  babel: new ConfigTransform({
    file: {
      js: ['babel.config.js'],
    },
  }),
  postcss: new ConfigTransform({
    file: {
      js: ['postcss.config.js'],
      json: ['.postcssrc.json', '.postcssrc'],
      yaml: ['.postcssrc.yaml', '.postcssrc.yml'],
    },
  }),
  eslintConfig: new ConfigTransform({
    file: {
      js: ['.eslintrc.js'],
      json: ['.eslintrc', '.eslintrc.json'],
      yaml: ['.eslintrc.yaml', '.eslintrc.yml'],
    },
  }),
  jest: new ConfigTransform({
    file: {
      js: ['jest.config.js'],
    },
  }),
  browserslist: new ConfigTransform({
    file: {
      lines: ['.browserslistrc'],
    },
  }),
};

// 预留配置
const reservedConfigTransforms = {
  vue: new ConfigTransform({
    file: {
      js: ['vue.config.js'],
    },
  }),
};

// 代码结尾加上 \n
const ensureEOL = str => {
  if (str.charAt(str.length - 1) !== '\n') {
    return str + '\n';
  }

  return str;
};
class Generator {
  constructor(pkg, context) {
    this.pkg = pkg; // package 信息，包含用户选择的依赖
    this.context = context;
    this.configTransforms = {};
    this.files = {};
  }

  // generator 模版中调用，合并依赖
  extendPackage(fields) {
    const pkg = this.pkg;
    for (const key in fields) {
      const value = fields[key];
      const existing = pkg[key];
      // 如果为 dependencies/devDependencies 就与已有属性合并
      if (
        isObject(value) &&
        (key === 'dependencies' || key === 'devDependencies')
      ) {
        pkg[key] = Object.assign(existing || {}, value);
      } else {
        pkg[key] = value;
      }
    }
  }

  async generate() {
    this.extractConfigFiles();
    console.log('this.files :>> ', this.files);
    console.log('this.pkg :>> ', this.pkg);
  }

  // 提取 package.json 中的配置
  extractConfigFiles() {
    // 预设的依赖
    const configTransforms = {
      ...defaultConfigTransforms,
      ...this.configTransforms,
      ...reservedConfigTransforms,
    };

    const extract = key => {
      // 筛选相应的配置
      if (configTransforms[key] && this.pkg[key]) {
        const value = this.pkg[key];
        const configTransform = configTransforms[key];
        const res = configTransform.transform(value, this.files, this.context);

        const { content, filename } = res;
        this.files[filename] = ensureEOL(content);
        delete this.pkg[key];
      }
    };

    extract('vue');
    extract('babel');
  }
}

module.exports = Generator;

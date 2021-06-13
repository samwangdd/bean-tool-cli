const path = require('path');
const ejs = require('ejs');
const { isBinaryFileSync } = require('isbinaryfile');
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
    this.fileMiddlewares = [];
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

  render(source, additionalData = {}, ejsOptions = {}) {
    const baseDir = extractCallDir();
    source = path.resolve(baseDir, source);
    this._injectFileMiddleware(async files => {
      const data = this._resolveData(additionalData);
      // https://github.com/sindresorhus/globby
      const globby = require('globby');
      // 读取目录中所有的文件
      const _files = await globby(['**/*'], { cwd: source, dot: true });
      for (const rawPath of _files) {
        const sourcePath = path.resolve(source, rawPath);
        const content = this.renderFile(sourcePath, data, ejsOptions);
        if (Buffer.isBuffer(content) || /[^\s]/.test(content)) {
          files[rawPath] = content;
        }
      }
    });
  }

  renderFile(name, data, ejsOptions) {
    // 如果是二进制文件，直接将读取结果返回
    if (isBinaryFileSync(name)) {
      return fs.readFileSync(name);
    }
    // 返回文件内容
    const template = fs.readFileSync(name, 'utf-8');
    return ejs.render(template, data, ejsOptions);
  }

  _injectFileMiddleware(middleware) {
    this.fileMiddlewares.push(middleware);
  }

  _resolveData(additionalData) {
    return {
      options: this.options,
      rootOptions: this.rootOptions,
      ...additionalData,
    };
  }
}

// http://blog.shaochuancs.com/about-error-capturestacktrace/
// TODO: 获取调用栈信息
function extractCallDir() {
  const obj = {};
  Error.captureStackTrace(obj);
  // 在 lib\generator\xx 等各个模块中 调用 generator.render()
  // 将会排在调用栈中的第四个，也就是 obj.stack.split('\n')[3]
  const callSite = obj.stack.split('\n')[3];
  // the regexp for the stack when called inside a named function
  const namedStackRegExp = /\s\((.*):\d+:\d+\)$/;
  // the regexp for the stack when called inside an anonymous
  const anonymousStackRegExp = /at (.*):\d+:\d+$/;
  let matchResult = callSite.match(namedStackRegExp);
  if (!matchResult) {
    matchResult = callSite.match(anonymousStackRegExp);
  }
  const fileName = matchResult[1];
  return path.dirname(fileName);
}

module.exports = Generator;

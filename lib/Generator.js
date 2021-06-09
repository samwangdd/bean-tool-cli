const isObject = value => value && typeof value === 'object';

class Generator {
  constructor(pkg, context) {
    this.pkg = pkg;
    this.context = context;
  }

  // generator 模版中调用，用于注入依赖
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

  async generate() {}
}

module.exports = Generator;

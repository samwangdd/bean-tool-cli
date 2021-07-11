// REVIEW: ode require 依赖的查找顺序
// 不需要单独安装 slash，否则运行报错
// https://stackoverflow.com/questions/61558835/type-module-in-package-json-throw-new-err-require-esmfilename-parentpath
const slash = require('slash');

// 转换 windows 反斜杠路径
// Unix    => foo/bar => foo/bar
// Windows => foo\\bar => foo/bar
module.exports = function normalizeFilePaths(files) {
  Object.keys(files).forEach(file => {
    const normalized = slash(file);
    if (file !== normalized) {
      files[normalized] = files[file];
      delete files[file];
    }
  });

  return files;
};

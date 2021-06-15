// 递归版序列化代码？？
module.exports = function stringifyJS(value) {
  const { stringify } = require('javascript-stringify');

  return stringify(
    value,
    (val, indent, stringify) => {
      if (val && val._expression) {
        return val._expression;
      }

      return stringify(val);
    },
    4,
  );
};

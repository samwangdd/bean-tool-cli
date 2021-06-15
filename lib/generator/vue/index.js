module.exports = generator => {
  generator.render('./template');

  generator.extendPackage({
    dependencies: {
      vue: '^2.6.12',
    },
    devDependencies: {
      'vue-template-compiler': '^2.6.12',
    },
  });

  // TODO: ?? 为什么分开设置
  generator.extendPackage({
    browserslist: ['> 1%', 'last 2 versions', 'not dead'],
  });
};

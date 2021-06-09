module.exports = generator => {
  generator.extendPackage({
    babel: {
      preset: ['@babel/preset-env'],
    },
    dependencies: {
      'core-js': '^3.8.3',
    },
    devDependencies: {
      '@babel-core': '',
    },
  });
};

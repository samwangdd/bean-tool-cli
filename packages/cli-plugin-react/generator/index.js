module.exports = (generator, options = {}) => {
  generator.extendPackage({
    dependencies: { react: '^16.13.1', 'react-dom': '^16.13.1' },
  });
};

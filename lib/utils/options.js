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

module.exports = {
  extends: ['eslint:recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 0,
    'no-unused-vars': [
      2,
      {
        vars: 'local',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    // careful check: https://stackoverflow.com/questions/13497971/what-is-the-matter-with-script-targeted-urls
    'no-script-url': 0,
  },
  parser: 'babel-eslint',
};

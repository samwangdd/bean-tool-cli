'use strict';

const path = require('path');

const projectDir = __dirname;
const tsconfigPath = path.join(projectDir, '');

require('ts-node').register({
  project: tsconfigPath,
});

require('./tools/gulp/gulpfile');

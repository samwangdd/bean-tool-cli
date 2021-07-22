#!/usr/bin/env node
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('../lib/dev.config');
const buildConfig = require('../lib/pro.config');

// 获取 shell 命令参数
const args = process.argv.slice(2);
console.log('args :>> ', args);
if (args[0] === 'serve') {
  const compiler = webpack(devConfig);
  const server = new WebpackDevServer(compiler);

  server.listen(8080, '0.0.0.0', err => {
    console.error(err);
  });
} else if (args[0] === 'build') {
  webpack(buildConfig, (err, stats) => {
    if (err) console.error(err);
    if (stats.hasErrors()) {
      console.log(new Error('Build failed with errors'));
    }
  });
} else {
  console.error('error command');
}

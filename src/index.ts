import { program } from 'commander';
import minimist from 'minimist';
import chalk from 'chalk';
import {cleanArgs} from './utils/string';
import create from './command/create';

program
  .version(require('../package').version)     //  显示版本号
  .usage('<command> [options]');

program.command('list').description('当前所有模版').action(require('../lib/list'));
program.command('add').description('添加模版').action(require('../lib/add'));
program.command('delete').description('删除模版').action(require('../lib/delete'));

program.command('create <app-name>')
.description('create a new project')
.option('-p, --preset <presetName>','Skip prompts and use saved or remote preset')
.option('-d, --default', 'Skip prompts and use default preset')
.action((name, cmd) => {
  const options = cleanArgs(cmd)
  if (minimist(process.argv.slice(3))._.length > 1) {
    console.log(chalk.yellow('\n ⚠️ 检测到您输入了多个名称，将以第一个参数为项目名'));
  }
  create(name, options)
})

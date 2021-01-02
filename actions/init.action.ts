import inquirer from 'inquirer';
import fs from 'fs';
import ora from 'ora';
// import downloads from 'download-git-repo';
import symbols from 'log-symbols';
import chalk from 'chalk';
import handlebars from 'handlebars';
import { AbstractAction } from './abstract.action';

const downloads = require('download-git-repo');
export class InitAction extends AbstractAction {
  public async handle(inputs: any) {
    console.log('inputs.tpl :>> ', inputs.tpl);
    console.log('inputs.path :>> ', inputs.path);
    let tpl = inputs.tpl;
    let path = inputs.path || 'https://github.com:samwangdd/vue_shoppingmall#master';
    // TODO: 代码冗余
    if (!fs.existsSync(tpl)) {
      inputs = {
        ...inputs,
        ...(await inquirer.prompt([{ type: 'input', name: 'tpl', message: '请输入项目名称' }])),
      };
    }
    if (!fs.existsSync(path)) {
      inputs = {
        ...inputs,
        ...(await inquirer.prompt([{ type: 'input', name: 'path', message: '请输入模板地址' }])),
      };
    }
    const spinner = ora('正在下载模板...');
    spinner.start();
    downloads(inputs.path, name, { clone: 'true' }, (err: String) => {
      if (err) {
        spinner.fail();
        console.log(symbols.error, chalk.red(err));
      } else {
        spinner.succeed();
        const fileName = `${name}/package.json`;
        const meta = {
          name,
          // description: answers.description,
          // author: answers.author,
        };
        if (fs.existsSync(fileName)) {
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }
        console.log(symbols.success, chalk.green('项目初始化完成！'));
      }
    });
  }
}

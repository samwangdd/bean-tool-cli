import fs from 'fs';
import program from 'commander';
import downloads from 'download-git-repo';
import inquirer from 'inquirer';
import handlebars from 'handlebars';
import chalk from 'chalk';
import ora from 'ora';
import symbols from 'log-symbols';


program
  .version('1.0.0', '-v, --version')
  .command('init <name>')
  .description('初始化项目')
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer.prompt([
        {type: 'input', name: 'author', message: '请输入创建者名称'}
      ]).then((answers) => { 
        const spinner = ora('正在下载模板...');
        spinner.start();
        downloads('https://github.com:samwangdd/vue_shoppingmall#master', name, {clone: 'true'}, (err) => {
          if (err) {
            spinner.fail();
            console.log(symbols.error, chalk.red(err));
          }else{
            spinner.succeed();
            const fileName = `${name}/package.json`;
            const meta = {
              name,
              description: answers.description,
              author: answers.author
            };
            if (fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
            }
            console.log(symbols.succeed, chalk.green('项目初始化完成！'));
          }
        })
      });
    }else{
      console.log(symbols.err, chalk.red('项目已存在！'))
    }
  })

program.parse(process.argv);

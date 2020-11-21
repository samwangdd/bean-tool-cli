"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const commander_1 = __importDefault(require("commander"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const inquirer_1 = __importDefault(require("inquirer"));
const handlebars_1 = __importDefault(require("handlebars"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const log_symbols_1 = __importDefault(require("log-symbols"));
const init = () => {
    commander_1.default
        .version('1.0.0', '-v, --version')
        .command('init <name>')
        .description('初始化项目')
        .action((name) => {
        if (!fs_1.default.existsSync(name)) {
            inquirer_1.default.prompt([
                { type: 'input', name: 'author', message: '请输入创建者名称' }
            ]).then((answers) => {
                const spinner = ora_1.default('正在下载模板...');
                spinner.start();
                download_git_repo_1.default('https://github.com:samwangdd/vue_shoppingmall#master', name, { clone: 'true' }, (err) => {
                    if (err) {
                        spinner.fail();
                        console.log(log_symbols_1.default.error, chalk_1.default.red(err));
                    }
                    else {
                        spinner.succeed();
                        const fileName = `${name}/package.json`;
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author
                        };
                        if (fs_1.default.existsSync(fileName)) {
                            const content = fs_1.default.readFileSync(fileName).toString();
                            const result = handlebars_1.default.compile(content)(meta);
                            fs_1.default.writeFileSync(fileName, result);
                        }
                        console.log(log_symbols_1.default.success, chalk_1.default.green('项目初始化完成！'));
                    }
                });
            });
        }
        else {
            console.log(log_symbols_1.default.error, chalk_1.default.red('项目已存在！'));
        }
    });
    commander_1.default.parse(process.argv);
};
exports.default = init;

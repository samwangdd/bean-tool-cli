"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const minimist_1 = __importDefault(require("minimist"));
const chalk_1 = __importDefault(require("chalk"));
const string_1 = require("./utils/string");
const command_1 = require("./command");
commander_1.program
    .version(require('../package').version) //  显示版本号
    .usage('<command> [options]');
commander_1.program.command('list').description('当前所有模版').action(command_1.list);
commander_1.program.command('add').description('添加模版').action(command_1.add);
commander_1.program.command('delete').description('删除模版').action(command_1.remove);
commander_1.program
    .command('create <app-name>')
    .description('create a new project')
    .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
    .option('-d, --default', 'Skip prompts and use default preset')
    .action((name, cmd) => {
    const options = string_1.cleanArgs(cmd);
    if (minimist_1.default(process.argv.slice(3))._.length > 1) {
        console.log(chalk_1.default.yellow('\n ⚠️ 检测到您输入了多个名称，将以第一个参数为项目名'));
    }
    command_1.create(name, options);
});

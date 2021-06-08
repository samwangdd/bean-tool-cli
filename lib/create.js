const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const Creator = require('./Creator');
const PromptModuleAPI = require('./PromptModuleApi');

async function create(name) {
  // 获取各模块交互提示
  const promptModules = getPromptModules();
  const creator = new Creator();
  const promptAPI = new PromptModuleAPI(creator);
  promptModules.forEach(m => m(promptAPI));
  const answers = await inquirer.prompt(creator.getFinalPrompts());
  answers.features.unshift('vue', 'webpack');

  const pkg = {
    name,
    version: '0.1.0',
    dependencies: {},
    devDependencies: {},
  };
}

// 获取提示模版
// TODO：自动获取 promptModules 下文件
function getPromptModules() {
  return ['babel', 'router', 'vuex', 'linter'].map(file =>
    require(`./promptModules/${file}`),
  );
}

module.exports = create;

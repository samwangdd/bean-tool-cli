const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const Creator = require('./Creator');
const PromptModuleAPI = require('./PromptModuleApi');

async function create(name) {
  // 认真思考以下代码逻辑，模块独立，功能递进，类似一个 pipeline
  // 获取各模块交互提示，获得一个函数数组
  const promptModules = getPromptModules();
  // 实例化 creator：将在上面添加所有交互式命令
  const creator = new Creator();
  // creator 添加 injectFeature，injectPrompt 方法
  const promptAPI = new PromptModuleAPI(creator);
  // m 为函数，接受 api 参数，调用 api.injectFeature 或 api.injectPrompt
  // 为 creator 对象添加交互语句
  promptModules.forEach(m => m(promptAPI));
  const answers = await inquirer.prompt(creator.getFinalPrompts());
  answers.features.unshift('vue', 'webpack');

  console.log('answers :>> ', answers);

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

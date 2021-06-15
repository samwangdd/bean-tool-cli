const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const Creator = require('./Creator');
const PromptModuleAPI = require('./PromptModuleApi');
const Generator = require('./Generator');

async function create(name) {
  // TODO: 装饰器模式
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

  console.log('answers :>> ', answers);

  const pkg = {
    name,
    version: '0.1.0',
    dependencies: {},
    devDependencies: {},
  };

  const generator = new Generator(pkg, path.join(process.cwd(), name));
  answers.features.unshift('vue', 'webpack');
  answers.features.forEach(feature => {
    require(`./generator/${feature}`)(generator, answers);
  });
  await generator.generate();
}

function getPromptModules() {
  return ['babel', 'router', 'vuex', 'linter'].map(file =>
    require(`./promptModules/${file}`),
  );
}

module.exports = create;

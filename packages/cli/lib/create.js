const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const PromptModuleAPI = require('./PromptModuleApi');
const Creator = require('./Creator');
const Generator = require('./Generator');
const PackageManager = require('./PackageManager');
const { log } = require('./utils/logger');
const { savePreset, rcPath } = require('./utils/options');
const clearConsole = require('./utils/clearConsole');
const writeFileTree = require('./utils/writeFileTree');

async function create(name) {
  // 清空控制台
  clearConsole();
  // 判断项目文件是否存在，选择覆盖/合并
  const targetDir = path.join(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
        choices: [
          { name: 'OverWrite', value: 'overwrite' },
          { name: 'Merge', value: 'merge' },
        ],
      },
    ]);

    if (action === 'overwrite') {
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
      await fs.remove(targetDir);
    }
  }

  /*
   * 获取各模块交互提示
   *
   * REVIEW: 装饰器模式，认真思考以下代码逻辑，模块独立、功能递进，类似一个 pipeline
   */
  const promptModules = getPromptModules();
  // 实例化 Creator：添加所有交互式命令
  const creator = new Creator();
  // 给 creator 实例添加 injectFeature，injectPrompt 方法
  const promptAPI = new PromptModuleAPI(creator);
  /**
   * 向 creator 实例注入 feature/prompt
   * fn 为函数，接受 api 参数，调用 api.injectFeature / api.injectPrompt
   */
  promptModules.forEach(fn => fn(promptAPI));

  const answers = await inquirer.prompt(creator.getFinalPrompts());

  // 如果不是「手动」，则使用预设配置
  if (answers.preset !== '__manual__') {
    const preset = creator.getPresets()[answers.preset];
    Object.keys(preset).forEach(key => {
      answers[key] = preset[key]; // 将预设属性赋值给 answers
    });
  }

  // 如果用户选择保存配置，并成功保存：显示 log 信息
  if (answers.save && answers.saveName && savePreset(answers.saveName, answers)) {
    log();
    log(`Preset ${chalk.yellow(answers.saveName)} saved in ${chalk.yellow(rcPath)}`);
  }

  const pkg = {
    name,
    version: '0.1.0',
    dependencies: {},
    devDependencies: {},
  };
  // TODO: PackageManager 没有完成
  const pm = new PackageManager(targetDir, answers.PackageManager);

  // 添加 plugin-service 模块
  answers.features && answers.features.unshift('service');
  answers.features &&
    answers.features.forEach(feature => {
      if (feature !== 'service') {
        pkg.devDependencies[`@samwangdd/cli-plugin-${feature}`] = '^1.0.0';
      } else {
        pkg.devDependencies[`@samwangdd/cli-plugin-service`] = '^1.0.0';
      }
    });

  await writeFileTree(targetDir, {
    'package.json': JSON.stringify(pkg, null, 2),
  });

  await pm.install();

  // 生成模版
  const generator = new Generator(pkg, targetDir);
  answers.features.forEach(feature => {
    if (feature !== 'service') {
      require(`@samwangdd/cli-plugin-${feature}/generator`)(generator, answers);
    } else {
      require(`@samwangdd/cli-plugin-service/generator`)(generator, answers);
    }
  });
  await generator.generate();

  // TODO: 添加 loading
  await pm.install();
  log(chalk.green(`\n依赖下载完成！执行下列命令开始开发：\n`));
  log(`cd ${name}`);
  log(`npm run dev`);
}

// 引入文件，得到一个函数数组
function getPromptModules() {
  return ['babel', 'router', 'vuex', 'linter'].map(file => require(`./promptModules/${file}`));
}

module.exports = create;

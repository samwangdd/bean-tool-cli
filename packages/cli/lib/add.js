const inquirer = require('inquirer');
const Generator = require('./Generator');
const PackageManager = require('./PackageManager');
const clearConsole = require('./utils/clearConsole');
const getPackage = require('./utils/getPackage');
const readFiles = require('./utils/readFiles');

async function add(name) {
  clearConsole();

  let answers = {};
  try {
    // if (fs.existsSync(`@mvc/cli-plugin-${name}/prompts`)) {
    const pluginPrompts = require(`@mvc/cli-plugin-${name}/prompts`);
    answers = await inquirer.prompt(pluginPrompts);
    // }
  } catch (error) {
    // FIXME: prompts.js 如果不存在会抛错
    // console.log('Action add: ', error);
  }

  const targetDir = process.cwd();
  const pkg = getPackage(targetDir);
  const generator = new Generator(pkg, targetDir, await readFiles(targetDir));
  const pm = new PackageManager(targetDir, answers.PackageManager);
  require(`@mvc/cli-plugin-${name}/generator`)(generator, answers);

  await generator.generate();
  await pm.install();
}

module.exports = add;

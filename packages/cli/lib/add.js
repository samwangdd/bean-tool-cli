const inquirer = require('inquirer');
const clearConsole = require('./utils/clearConsole');
const Generator = require('./Generator');
const getPackage = require('./utils/getPackage');
const readFiles = require('./utils/readFiles');

async function add(name) {
  clearConsole();

  let answers = {};
  try {
    const pluginPrompts = require(`@mvc/cli-plugin-${name}/prompts`);
    answers = await inquirer.prompt(pluginPrompts);
  } catch (error) {
    console.log('Action add: ', error);
  }

  const targetDir = process.cwd();
  const pkg = getPackage(targetDir);
  const generator = new Generator(pkg, targetDir, await readFiles(targetDir));
}

module.exports = add;

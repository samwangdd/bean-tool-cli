/**
 * 获取 packege.json
 *
 * @param {*} targetPath 目标文件路径
 */
const path = require('path');
const fs = require('fs');

function getPackage(targetPath) {
  const packagePath = path.join(targetPath, 'package.json');

  let packageJson;
  try {
    packageJson = fs.readFileSync(packagePath, 'utf-8');
  } catch (error) {
    throw new Error(`The package.json file at '${targetPath}' does not exist`);
  }

  try {
    packageJson = JSON.parse(packageJson);
  } catch (error) {
    throw new Error(`The package.json is malformed`);
  }

  return packageJson;
}

module.exports = getPackage;

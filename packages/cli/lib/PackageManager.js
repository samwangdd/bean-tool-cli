const { log } = require('./utils/logger');
const executeCommand = require('./utils/executeCommand');

class PackageManager {
  constructor(context, packageManager) {
    this.context = context;
    if (packageManager) {
      this.bin = packageManager;
    } else if (context) {
      this.bin = 'npm';
    }
  }

  async runCommand(command) {
    await executeCommand(this.bin, [command], this.context);
  }

  async install() {
    log('\n正在下载...\n');
    return await this.runCommand('install');
  }
}

module.exports = PackageManager;

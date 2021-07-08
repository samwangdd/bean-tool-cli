const path = require('path');
const os = require('os');
const fs = require('fs-extra');

// 迁移 windows 中的配置
const migrateWindowsConfigPath = file => {
  if (process.platform !== 'win32') {
    return;
  }
  const appData = process.env.APPDATA;
  if (appData) {
    const rcDir = path.join(appData, 'vue');
    const rcFile = path.join(rcDir, file);
    const properRcFile = path.join(os.homedir(), file);
    if (fs.existsSync(rcFile)) {
      try {
        if (fs.existsSync(properRcFile)) {
          fs.removeSync(rcFile);
        } else {
          fs.moveSync(rcFile, properRcFile);
        }
        // eslint-disable-next-line no-empty
      } catch (e) {
        console.error('migrateWindowsConfigPath error', e);
      }
    }
  }
};

const xdgConfigPath = file => {
  const xdgConfigHome = process.env.XDG_CONFIG_HOME;
  if (xdgConfigHome) {
    const rcDir = path.join(xdgConfigHome, 'vue');
    if (!fs.existsSync(rcDir)) {
      // https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir-sync.md
      fs.ensureDirSync(rcDir, 0o700);
    }
    return path.join(rcDir, file);
  }
};

exports.getRcPath = file => {
  migrateWindowsConfigPath(file);

  return process.env.VUE_CLI_CONFIG_PATH || xdgConfigPath(file) || path.join(os.homedir(), file);
};

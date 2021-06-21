const execa = require('execa');

module.exports = function executeCommand(command, cwd) {
  console.log('cwd :>> ', cwd);
  return new Promise(async (resolve, reject) => {
    const child = await execa(command, ['install'], {
      cwd,
      studio: ['inherit', 'pipe', 'inherit'],
    });
    if (child.stdout) {
      child.stdout.on('data', buffer => {
        process.stdout.write(buffer);
      });
    }

    child.on('close', code => {
      console.log('code :>> ', code);
      if (code !== 0) {
        reject(new Error(`command failed: ${command}`));
        return;
      }
    });
    resolve();
  });
};

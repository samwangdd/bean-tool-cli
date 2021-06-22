const execa = require('execa');

module.exports = function executeCommand(command, cwd) {
  // execa('echo', ['unicorns']).stdout.pipe(process.stdout);
  return new Promise(async (resolve, reject) => {
    try {
      const child = await execa(command, ['install'], {
        cwd,
        studio: ['inherit', 'pipe', 'inherit'],
      }).stdout.pipe(process.stdout);

      const { exitCode } = child;

      if (exitCode !== 0) {
        reject(new Error(`command failed: ${command}`));
      }
    } catch (error) {
      console.error('executeCommand: >>', error);
    }

    // TODO: 进程通信，将 stdout 进度返回给主进程
    // if (child.stdout) {
    //   console.log('child.stdout :>> ', child.stdout);
    //   child.stdout.on('data', buffer => {
    //     process.stdout.write(buffer);
    //   });
    // }
    resolve();
  });
};

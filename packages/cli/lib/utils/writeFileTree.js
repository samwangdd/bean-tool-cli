const fs = require('fs-extra');
const path = require('path');

module.exports = async function writeFileTree(dir, files) {
  Object.keys(files).forEach(filename => {
    const filePath = path.join(dir, filename);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[filename]);
  });
};

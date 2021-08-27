const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '../homes');

async function removeFile(cwd, username) {
    let currentDirPath = path.join(ROOT, cwd);
    if (!currentDirPath.includes(path.join(ROOT, username, '/'))) {
        return { result: false, path: currentDirPath, pathCheck: path.join(ROOT, username, '/'), cwd: cwd }
    }
    fs.unlinkSync(currentDirPath);
    return { result: true, path: currentDirPath, pathCheck: path.join(ROOT, username, '/') }
}
module.exports = { removeFile }
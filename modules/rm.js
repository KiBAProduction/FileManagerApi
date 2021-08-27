const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '../homes');

async function remove(cwd, username) {
    let currentDirPath = path.join(ROOT, cwd);
    if (!currentDirPath.includes(path.join(ROOT, username, '/'))) {
        return false;
    }
    try {
        fs.unlink(currentDirPath);
        return true;

    } catch (err) {
        throw new Error(err);
    }
}
module.exports = { remove }
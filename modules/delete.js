const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '../homes');

async function remove(cwd, username) {
    const currentPath = path.join(ROOT, username, cwd);
    try {
        const obj = await fs.promises.stat(currentPath);
        if (obj.isDirectory()) {
            rimraf(currentPath, function () {
                return { status: 'Successfully deleted folder.' }
            });
        }
        else {
            if (fs.unlink(currentPath)) {
                return { status: 'Successfully deleted file.' }
            }
        }
    } catch (err) {
        throw new Error(err);
    }
}
module.exports = { remove }
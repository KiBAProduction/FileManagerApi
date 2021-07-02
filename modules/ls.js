const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '../homes');

async function scandir(cwd, username) {
    const currentDirPath = path.join(ROOT, username, cwd);
    try {
        const files = await fs.promises.readdir(currentDirPath);
        let promises = files.map(async file => {
            const pathName = path.join(cwd, file)
            const stat = await fs.promises.stat(path.join(currentDirPath, file));
            return { file: file, path: pathName, size: stat.size, mtime: stat.mtime, isFolder: stat.isDirectory() };
        })
        return await Promise.all(promises);

    } catch (err) {
        throw new Error(err);
    }
}
module.exports = { scandir }
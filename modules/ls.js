const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '../homes');

async function scandir(cwd, username) {
    let currentDirPath = path.join(ROOT, username, cwd);
    if (!currentDirPath.includes(path.join(ROOT, username, '/'))) {
        currentDirPath = path.join(ROOT, username, '/');
    }
    try {
        const files = await fs.promises.readdir(currentDirPath);
        let promises = files.map(async file => {
            let tempsize = 0;
            const stat = await fs.promises.stat(path.join(currentDirPath, file));
            if (stat.size/(1024*1024*1024)>1) {
                tempsize = Math.round(stat.size/(1024*1024*1024)*100)/100 + 'Gb';
            }
            else if (stat.size/(1024*1024)>1) {
                tempsize = Math.round(stat.size/(1024*1024)*100)/100 + 'Mb';
            }
            else if (stat.size/1024>1) {
                tempsize = Math.round(stat.size/1024*100)/100 + 'kb';
            }
            else {
                tempsize = stat.size + 'b';
            }
            let fullFile = file;
            let length = 20;
            if (file.length > length) {
                file = file.substring(0, length) + '...';
            }
            if (stat.isDirectory()) {
                return { file: file, fullFile: fullFile, isFolder: stat.isDirectory(), get: '?folder=' + path.join(currentDirPath, fullFile).replace(path.join(ROOT, username, '/'), '')};
            }
            else {
                return { file: file, id: fullFile.substring(0, 10), fullFile: fullFile, path: path.join(currentDirPath, fullFile).replace(ROOT, ''), ext: path.extname(file), download: 'http://localhost:3000/' + path.join(currentDirPath, fullFile).replace(ROOT, ''), size: tempsize, mtime: stat.mtime.getDate()+"/"+(stat.mtime.getMonth()+1)+"/"+stat.mtime.getFullYear(), isFolder: stat.isDirectory() };
            }
        })
        let results = await Promise.all(promises);
        if (cwd != '/') {
            results.push({file: '..', isFolder: true, get: '?folder=' + path.join(currentDirPath, '../').replace(path.join(ROOT, username, '/'), '')})
        }
        return results;

    } catch (err) {
        throw new Error(err);
    }
}
module.exports = { scandir }
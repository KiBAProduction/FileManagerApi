const path = require('path');
const fs = require('fs');

const ROOT = 'D:\\\\www\\';

async function scandir(cwd) {
    let folderList = [];
    let fileList = [];

    const currentDirPath = path.join(ROOT, cwd);

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




    // files.forEach(function (name) {
    //     const filePath = path.join(currentDirPath, name);
    //     const stat = fs.statSync(filePath);
    //     if (stat.isFile()) {
    //         fileList.push({ file: name, size: stat.size, time: stat.atime, isFile: true })
    //     } else if (stat.isDirectory()) {
    //         folderList.push({ file: name, size: null, time: stat.atime, isFile: false })
    //     }
    // });
    // console.log([...folderList, ...fileList]);
    // return [...folderList, ...fileList];

}


//export default scandir
//module.exports = scandir;

module.exports = { scandir }
const fsPromises = require('fs/promises');
// const fsPromises = fs.promises;
const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathFolderCopy = path.join(__dirname, 'files-copy');

fs.access(pathFolderCopy, (error) => {
  if (error) {
    fsPromises.mkdir(pathFolderCopy);
    console.log('Папка files-copy создана');
  } else {
    console.log('Папка files-copy уже существует');
  }
});

async function copyFolder(fromPath, toPath) {
  await fsPromises.rm(toPath, { force: true, recursive: true });
  await fsPromises.mkdir(toPath, { recursive: true });

  const filesNameArr = await fsPromises.readdir(fromPath, { withFileTypes: true });

  for (let item of filesNameArr) {
    const currentItemPath = path.join(fromPath, item.name);
    const copyItemPath = path.join(toPath, item.name);

    if (item.isDirectory()) {
      await fsPromises.mkdir(copyItemPath, { recursive: true });
      await copyFolder(currentItemPath, copyItemPath);
    } else if (item.isFile()) {
      await fsPromises.copyFile(currentItemPath, copyItemPath);
    }
  }
}
copyFolder(pathFolder, pathFolderCopy);
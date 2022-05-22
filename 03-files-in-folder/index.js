const fsPromises = require('fs/promises');
const path = require('path');

(async () => {
  const arrayFileName = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), {
    withFileTypes: true });

  for (let file of arrayFileName) {
    if (file.isFile()) {
      const fullFileName = file.name.toString();
      const fileName = fullFileName.split('.')[0];

      const pathToFile = path.join(__dirname, 'secret-folder', fullFileName);
      const fileType = path.extname(pathToFile).substring(1);
      const stats = await fsPromises.stat(pathToFile);

      console.log(`${fileName} - ${fileType} - ${stats.size}b`);
    }
  }
})();
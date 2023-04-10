const fs = require("fs/promises");
const fileName = "myfile.txt";
const updateFile = async (fileName, fileContent) => {
  // write code here
  // dont change function name
  return await fs.appendFile(fileName, fileContent);
};
updateFile(fileName, "\n, An online learning platform");

module.exports = updateFile;

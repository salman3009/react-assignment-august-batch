const fs = require("fs/promises");
const fileName = "myfile.txt";
const reader = async (fileName) => {
  // write code here
	// dont change function name
  const content = await fs.readFile(fileName);
  return content.toString();
};
reader(fileName).then((a) => console.log(a));

module.exports =  reader ;

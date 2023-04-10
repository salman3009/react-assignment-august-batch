const fs = require('fs/promises')
const fName = "myfile.txt"
const fContent = "I wrote someting'"
const myFileWriter = async(fileName,fileContent) =>{
	await fs.writeFile(fileName,fileContent)
}
myFileWriter(fName,fContent)


const myFileReader = async (fileName) =>{
	const content = await fs.readFile(fileName)
	return content.toString();
}
myFileReader(fName).then(a=>console.log(a))

const myFileUpdater = async (fileName,fileContent) => {
	return await fs.appendFile(fileName,fileContent)
}
myFileUpdater(fName,"\nnew content")

const myFileDeleter = async (fileName) => {
	return await fs.unlink(fileName)
}
//myyFileDeleter(fName)



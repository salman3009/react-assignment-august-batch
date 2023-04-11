const file = require('fs/promises');
let fileName = "newton.txt";
let content ="welcome to MERN stack";

console.log(__dirname);
const writeFileDetails= async (fileName,content)=>{
   await file.writeFile(fileName,content);
}

writeFileDetails(fileName,content);


const readFileDetails = async(fileName)=>{
  let result = await file.readFile(fileName);
  //binary format - buffer - unicode encoded string 
   console.log(result);
  return result.toString();
}
readFileDetails(fileName).then((result)=>{
  console.log(result);
})


const appendFileDetails= async (fileName)=>{
    await file.appendFile(fileName," And my name is akash");
 }
 
 appendFileDetails(fileName);
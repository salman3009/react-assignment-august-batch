const bcrypt = require('bcryptjs');
const saltFactor = 10; 


const generatePassword = async(input)=>{
  try{
   const salt = await bcrypt.genSalt(saltFactor);
   const hashed_password = await bcrypt.hash(input,salt);
   return hashed_password;
  }catch(err){
    throw err;
  }
}

const comparePassword = async(password,actualPassword)=>{
  try{
   return await bcrypt.compare(password,actualPassword);
  }catch(err){
    throw(err);
  }
}

module.exports.generatePassword = generatePassword;
module.exports.comparePassword = comparePassword;
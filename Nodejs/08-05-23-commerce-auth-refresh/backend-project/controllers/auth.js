const User = require('../models/User');
const {registerValidation} = require('../validators/auth');
const {generatePassword,comparePassword} = require('../utils/passwordHelper');

const register = async (req,res)=>{
   
   const {error} = registerValidation(req.body);
   if(error){
      return res.status(400).json({
         message:error.details[0].message
      })
   }

    try{
      const {name,email,password} = req.body;
     const emailExists = await User.findOne({email});
     if(emailExists){
        return res.status(400).json({message:"email already exists"});
     }

     const hashed_password = await generatePassword(password);
     const user = new User({
        name,
        email,
        password:hashed_password
     })

     const result = await user.save();
     res.status(201).json({user:{result}});

    }catch(err){
      return res.status(500).json({message:err.message});
    }
}

const login = async (req,res)=>{
try{
   const {email,password} = req.body;
   const user = await User.findOne({email});
   if(!user){
      return res.status(400).json({
         message:"Email not found"
      });
   }
   const isPasswordStatus = await comparePassword(password,user.password);
   if(!isPasswordStatus){
      return res.status(400).json({
         message:"password is incorrect"
      })
   }
   const {_id,name,email:emailId} = user;
   return res.status(200).json({
      user:{_id,name,emailId},
      message:"successfully logged in"
   })

}catch(err){
   return res.status(500).json({message:err.message});
}
}

module.exports.register = register;
module.exports.login = login;
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const {registerValidation,loginValidation} = require('../validators/auth');
const {generatePassword,comparePassword} = require('../utils/passwordHelper');
const {generateAuthToken,generateRefreshToken} = require('../utils/authTokenGenHelper');


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
   const {error} = loginValidation(req.body);
   if(error){
      return res.status(400).json({
         message:error.details[0].message
      })
   }

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
   const auth_token = generateAuthToken(_id,name,emailId);
   const refresh_token = generateRefreshToken(_id,name,emailId);
   const newRefreshToken = new RefreshToken({
      refresh_token
   });
   await newRefreshToken.save();
   res.header('auth-token',auth_token);
   return res.status(200).json({
      user:{_id,name,emailId},
      auth_token,
      refresh_token,
      message:"successfully logged in"
   })

}catch(err){
   return res.status(500).json({message:err.message});
}
}

const generateNewauthToken = async(req,res)=>{
   try{
      const refreshToken = await RefreshToken.findOne({
         refresh_token:req.header("refresh-token")
      });
      if(!refreshToken){
         return res.status(400).json({message:"you are logged,Need to login again"});
      }
      const {_id,name,email} = req.user;
      const authToken = generateAuthToken(_id,name,email);
      return res.status(200).json({
         message:"new token generated",
         auth_token:authToken
      });
   }catch(err){
      res.status(400).json({message:err.message});
   }
}

module.exports.register = register;
module.exports.login = login;
module.exports.generateNewauthToken = generateNewauthToken;
const User = require('../models/User');
const {registerValidation} = require('../validators/auth');

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

     const user = new User({
        name,
        email,
        password
     })

     const result = await user.save();
     res.status(200).json({user:{result}});

    }catch(err){
      return res.status(500).json({message:err.message});
    }
}

module.exports.register = register;
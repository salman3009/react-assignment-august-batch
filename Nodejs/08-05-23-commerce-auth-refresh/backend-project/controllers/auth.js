const User = require('../models/User');


const register = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
     const emailExists = await User.findOne({email});
     if(emailExists){
        return res.status(400).json({message:"email already exists"});
     }

     const user = new User({
        name,
        email,
        password
     })

     const {_id,name,email} = await user.save();
     res.status(200).json({user:{_id,name,email}});

    }catch(err){
      return res.status(500).json({message:err.message});
    }
}

module.exports.register = register;
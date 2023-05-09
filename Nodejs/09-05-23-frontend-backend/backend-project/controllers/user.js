const User = require('../models/User');


const profile = async (req,res)=>{
  try{
     const userData = await User.findOne({_id:req.user._id});
     if(!userData){
        return res.status(400).json({
            message:"User does not exists"
        })
     }
     return res.status(200).json({
        user:userData
     })
  }catch(err){
    return res.status(500).json({
        message:err.message
    })
  }
}
module.exports.profile = profile;
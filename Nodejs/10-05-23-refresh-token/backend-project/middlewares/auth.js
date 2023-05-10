const jwt = require('jsonwebtoken');


const verifyAuthToken = async (req,res,next)=>{
    try{
        const token = req.header('auth-token');
        const verified = jwt.verify(token,process.env.AUTH_TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
      return res.status(400).json({
        message:err.message
      })
    }
   


}

module.exports.verifyAuthToken = verifyAuthToken;
const jwt = require('jsonwebtoken');


const generateAuthToken =(_id,name,email)=>{
    return jwt.sign({_id,name,email},process.env.AUTH_TOKEN_SECRET,{expiresIn:'1m'});
}

const generateRefreshToken =(_id,name,email)=>{
    return jwt.sign({_id,name,email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"30d"});
}

module.exports.generateAuthToken = generateAuthToken;
module.exports.generateRefreshToken = generateRefreshToken;
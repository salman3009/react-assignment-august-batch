const jwt = require('jsonwebtoken');


const generateAuthToken =(_id,name,email)=>{
    return jwt.sign({_id,name,email},process.env.AUTH_TOKEN_SECRET,{expiresIn:'1m'});
}

module.exports.generateAuthToken = generateAuthToken;
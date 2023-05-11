
const handleDuplicateKeyError=(err,res)=>{
     const field = Object.keys(err.keyValue);
     const code = 409;
     const error = `An account with that ${field} already exists`;
     return res.status(code).send({message:error,fields:field});
}



module.exports =(err,req,res,next)=>{
    try{
        console.log(err);
        if(err.code && err.code == 11000){
           return handleDuplicateKeyError(err,res);
        }
        return res.status(400).send("some error happens");
    }catch(err){
        res.status(500).send("An unknow error occurred");
    }
}
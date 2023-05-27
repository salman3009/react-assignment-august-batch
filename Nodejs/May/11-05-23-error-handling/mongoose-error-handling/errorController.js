
const handleDuplicateKeyError=(err,res)=>{
     const field = Object.keys(err.keyValue);
     const code = 409;
     const error = `An account with that ${field} already exists`;
     return res.status(code).send({message:error,fields:field});
}

const handleValidationError=(err,res)=>{
    let errors = Object.values(err.errors).map((result=>result.message));
    let fields = Object.values(err.errors).map((result=>result.path));
    let code = 400;
    res.status(code).send({message:errors,fields:fields});
}


module.exports =(err,req,res,next)=>{
    try{
        if(err.name && err.name == "ValidationError"){
            return handleValidationError(err,res);
        }
        if(err.code && err.code == 11000){
           return handleDuplicateKeyError(err,res);
        }
         throw new Error("some unknow error");
    }catch(err){
        res.status(500).send("An unknow error occurred");
    }
}
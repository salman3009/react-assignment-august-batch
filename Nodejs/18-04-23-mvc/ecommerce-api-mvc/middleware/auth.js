

//custom middelware
module.exports = (req,res,next)=>{
     req.token = true;
     console.log("coming to middleware 3");
     next();
}
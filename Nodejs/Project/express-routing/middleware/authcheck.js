

module.exports =(req,res,next)=>{
    console.log("coming middleware");
    next();
}


module.exports = (req,res,next)=>{
     console.log("coming to middleware 3");
     next();
}
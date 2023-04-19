

module.exports={

    registerNewUser:(req,res)=>{
      console.log("new query",req.query);
      res.status(200).send('<h1>Registration is successfull</h1>')
    }

}
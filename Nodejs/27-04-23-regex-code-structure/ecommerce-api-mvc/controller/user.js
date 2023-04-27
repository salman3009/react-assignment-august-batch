

module.exports ={

    registerDetails:(req,res)=>{
        console.log(req.query);
        res.status(201).send("<h1>Everything is successfull</h1>")
    },

    loginDetails:(req,res)=>{
        console.log(req.body);
        res.status(201).send("<h1>Welcome to dashboard</h1>")
    }
}
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user');
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/auth',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("successfully connected");
});

app.post('/api/register',async (req,res,next)=>{
     
    try{

        const userPost = new User({
            email:req.body.email,
            password:req.body.password,
            age:Number(req.body.age)
        })

       await userPost.save();

       res.status(201).json({
        message:"user is created successfully"
       })

    }catch(err){
        if(err){
            let result=[];
            for(field in err.errors){
              result.push({propertyName:field,message:err.errors[field].message})
            }
            res.status(400).json({
                message:"validation error occured",
                list:result
            })
        }
        else{
            res.status(500).json({
                message:"server side error please try after sometime"
            })
        }
     
    }
  

})


app.listen(3000,()=>{
    console.log("server is running on 3000");
})






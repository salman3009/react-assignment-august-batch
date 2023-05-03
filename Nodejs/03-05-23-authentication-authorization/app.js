const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user');
app.use(bodyParser.json());
const bcrypt = require('bcryptjs');


mongoose.connect('mongodb://localhost:27017/auth',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("successfully connected");
});

app.post('/api/register',async (req,res,next)=>{
     
    try{

        let hashPassword = await bcrypt.hash(req.body.password,10);
        
        const userPost = new User({
            email:req.body.email,
            password:hashPassword,
            age:Number(req.body.age)
        })

       await userPost.save();

       res.status(201).json({
        message:"user is created successfully"
       })

    }catch(err){
        if(err.errors){
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
            res.status(400).json({
                message:"email id already exists"
            })
        }
     
    }
  

})



app.post('/api/login',async(req,res)=>{
     try{
        let emailResult = await User.findOne({email:req.body.email})
        if(!emailResult){
           return res.status(400).json({
                message:"email is not found"
            })
        }

        let comparePassword = await bcrypt.compare(req.body.password,emailResult.password);
        if(!comparePassword){
            return res.status(400).json({
                message:"password is not matched"
            }) 
        }


         return res.status(200).json({
            token:"adfasfasdf@#$$@#"
         })

     }catch(err){
        if(err.errors){
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
            res.status(400).json({
                message:"invalid error"
            })
        }
     }
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})






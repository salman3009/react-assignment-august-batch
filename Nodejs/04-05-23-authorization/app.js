const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user');
const Post = require('./models/post');
app.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

        const token = jwt.sign({emailId:emailResult.email,roles:emailResult.roles},'secret_this_should_be_longer',{expiresIn:"300"});

         return res.status(200).json({
            token:token
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

const postMiddleware = async (req,res,next)=>{
      console.log("inside the post middleware");
      next();
}

app.post('/api/post', postMiddleware, async (req,res,next)=>{
     
    try{
        const postDetails = new Post({
            comment:req.body.comment,
            postedBy:"akash@gmail.com"
        })

        await postDetails.save();

        res.status(201).json({
         message:"post is created successfully"
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


app.get('/api/post',postMiddleware, async (req,res,next)=>{
     
    try{
       let result =  await Post.find({},{_id:0,comment:1,postedBy:1});
        res.status(201).json({
         message:"Data fetched successfully",
         list:result
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






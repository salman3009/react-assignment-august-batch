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

        const token = jwt.sign({emailId:emailResult.email,roles:emailResult.roles},'secret_this_should_be_longer',{expiresIn:"1h"});

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
    try{
        const token = req.headers.authorization;
        const decode = jwt.verify(token,'secret_this_should_be_longer');
        req.emailId = decode.emailId;
        req.roles = decode.roles;
        next();
    }catch(err){
        res.status(500).json({
            message:err,
        })
    }  
}

const accessMiddleware=(req,res,next)=>{
    try{
        let status = true;
        console.log(req.roles);
        if(req.roles.includes('employee')){
            req.query = {postedBy:req.emailId};
            status = false;
         }
         if(req.roles.includes('admin')){
            req.query={};
            status = false;
         }
         if(req.roles.includes('superadmin')){
            req.query={};
            status = false;
         }
         if(status){
            throw new Error("it is not valid user");
         }
         console.log(req.query);
         next();
    }
    catch(err){
      res.status(500).json({
        message:"not a valid user"
      })
    }
}

const postingCommentMiddleware =(req,res,next)=>{
    try{

        if(!req.roles.includes("employee")){
            throw new Error("only employee can post");
        }
        else{
            next();
        }

    }catch(err){
        res.status(500).json({
            message:"only employee is allowed"
        })
    }
}


const adminAccessMiddleware =(req,res,next)=>{
    try{
        if(req.roles.includes("admin") || req.roles.includes("admin")){
            next();      
        }
        else{
            throw new Error("admin error");
        }

    }catch(err){
        res.status(500).json({
            message:"only admin and superadmin is allowed"
        })
    }
}


app.post('/api/post', postMiddleware,postingCommentMiddleware, async (req,res,next)=>{
     
    try{
        const postDetails = new Post({
            comment:req.body.comment,
            postedBy:req.emailId
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


app.get('/api/post',postMiddleware, accessMiddleware, async (req,res,next)=>{
     
    try{
       let result =  await Post.find(req.query,{_id:0,comment:1,postedBy:1});
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


app.delete('/api/post/:id',postMiddleware, adminAccessMiddleware, async (req,res,next)=>{
     
    try{
       let result =  await Post.findByIdAndDelete(req.params.id);
        res.status(201).json({
         message:"Data deleted successfully",
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






const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Employee = require('./models/employee');

mongoose.connect('mongodb://localhost:27017/errorHandling',{
   useNewUrlParser:true,
   useUnifiedTopology:true
}).then(()=>{
    console.log("database is connected");
}).catch(()=>{
   console.log("some exception in connecting the database");
})




app.post('',(req,res,next)=>{
  try{
     const employeeResult = new Employee({
       firstName:req.body.firstName,
       age:req.body.age,
       hobbies:req.body.hobbies
     });
     employeeResult.save().then((result)=>{
       return res.status(201).send(result);
     }).catch((err)=>{
       next(err);
     })
  }catch(err){
     next(err);
  }
})


app.listen(3000,()=>{
    console.log("server is listening");
});

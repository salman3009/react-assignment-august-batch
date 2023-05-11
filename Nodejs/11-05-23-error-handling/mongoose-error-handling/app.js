const express = require('express');
const app = express();
const mongoose = require('mongoose');

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
     let error = new Error("invalid data from frontend");
     error.status = 500;
     throw error;
  }catch(err){
     next(err);
  }
})







app.listen(3000,()=>{
    console.log("server is listening");
});

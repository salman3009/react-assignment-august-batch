const express = require('express');
const app = express();

app.get('/basic',(req,res,next)=>{
     try{
        let error = new Error("processing error in request");
        error.status = 404;
        throw error;
     }catch(err){
        next(err);
     }
})

app.post('/basic',(req,res,next)=>{
  try{
     let error = new Error("invalid data from frontend");
     error.status = 500;
     throw error;
  }catch(err){
     next(err);
  }
})

const errorHandler =(error,req,res,next)=>{
  const status = error.status || 400;
  const message = error.message || "some backend error";
  res.status(status).send(message);
}

app.use(errorHandler);
app.listen(3000,()=>{
    console.log("server is listening");
});

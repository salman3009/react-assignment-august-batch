const express = require('express');
const app = express();
const normalMiddelware =(req,res,next)=>{
  console.log("coming to normal middelware");
  next();
}
app.use(normalMiddelware);


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


const errorLogger =(error,req,res,next)=>{
    error.logger = "verification is done before sending";
    next(error);
 }

const errorHandler =(error,req,res,next)=>{
  const status = error.status || 400;
  const message = error.message || "some backend error";
  const logger = error.logger || "some exception";
  res.status(status).json({
   message:message,
   status:logger
});
}


app.use(errorLogger);
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("server is listening");
});

const express = require('express');
const app = express();

app.get('/basic',(req,res)=>{
     try{
        let error = new Error("processing error in request");
        error.status = 400;
        throw error;
     }catch(err){
       return res.status(err.status).json({
        message:err.message
       })
     }
})

app.listen(3000,()=>{
    console.log("server is listening");
});

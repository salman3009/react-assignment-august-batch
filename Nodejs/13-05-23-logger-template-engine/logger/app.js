const express = require('express');
const app = express();
const logger = require('./logger');

app.get("/",(req,res,next)=>{
    logger.info("successfully enteried the get method");
    res.status(200).send("successfully fetched data");
})

app.get('/info',(req,res,next)=>{
    try{    
        logger.info("successfully enteried the get fetch method");
        throw new Error("not user");
    }catch(err){
        logger.error("Error happens here",err);
     res.status(500).send("Error");
    }
})


app.listen(3000,()=>{

})
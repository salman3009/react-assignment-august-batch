const express = require('express');
const app = express();
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');

//third party middelware
app.use(parser.json());
app.use(parser.urlencoded());
app.use(cors());

//application level middleware
app.use((req,res,next)=>{
  console.log('1.coming to app.js file')
    next();
})

app.use(express.static(path.resolve(__dirname,'./build')));

app.use('/api/product',productRoute);
app.use('/api/user',userRoute);
app.get('',(req,res)=>{
   res.sendFile(path.resolve(__dirname,'./build','index.html'))
})

module.exports = app;
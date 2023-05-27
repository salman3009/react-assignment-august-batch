const express = require('express');
const app = express();
const productRoute = require('./routes/product');
const parser = require('body-parser');
const path = require('path');

//third party middelware
app.use(parser.json());

//application level middleware
app.use((req,res,next)=>{
  console.log('1.coming to app.js file')
    next();
})

app.use('',express.static(path.join(__dirname,'views')))
app.use('/api/product',productRoute);

module.exports = app;
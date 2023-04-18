const express = require('express');
const app = express();
const productRoute = require('./routes/product');

app.use(express.json());
app.use((req,res,next)=>{
  console.log('1.coming to app.js file')
    next();
})
app.use('/api/product',productRoute);

module.exports = app;
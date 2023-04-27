const express = require('express');
const app = express();
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const parser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const env = require('dotenv');
env.config();

//third party middelware
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
app.use(cors());

//application level middleware
app.use((req,res,next)=>{
  console.log('1.coming to app.js file')
    next();
})

mongoose.connect(process.env.URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("Database is connected");
}).catch((err)=>{
  console.log(err);
})

app.use(express.static(path.resolve(__dirname,'./build')));

app.use('/api/product',productRoute);
app.use('/api/user',userRoute);
app.get('',(req,res)=>{
   res.sendFile(path.resolve(__dirname,'./build','index.html'))
})

module.exports = app;
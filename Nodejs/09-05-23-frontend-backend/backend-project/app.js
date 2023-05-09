const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
const authRoute = require('./routes/auth');
const userRouter = require('./routes/user')

app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","*");
   next();
})

app.use("/api/auth",authRoute);
app.use("/api/user",userRouter);

app.all("*",(req,res)=>{
  res.status(404).json({
    message:"please provide valid route"
  })
})

module.exports = app;
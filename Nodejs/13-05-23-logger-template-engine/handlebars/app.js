const express = require('express');
const app = express();
const hbs = require('hbs');
app.set('view engine','hbs');
app.set('views',__dirname+"/views")


app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})
const express = require('express');
const app = express();
const parser = require('body-parser');

app.use(parser.json());

const productList=[{
    id:1,
    name:"car"
}]


app.use((req,res,next)=>{
    console.log("middeware1");
    next();

})

app.use((req,res,next)=>{
    console.log("middeware 2 ");
    next();
})

app.get('',(req,res)=>{
    res.send("<h1>hello world newton</h1>");
})

app.get('/product/list',(req,res)=>{
    res.status(400).json({
        message:"success",
        data:productList
    })
})

app.post('/list',(req,res)=>{
     console.log(req.body);
     res.status(201).json({
        message:"created"
     })
})


app.listen(3000,()=>{
    console.log("express is running on",3000);
})
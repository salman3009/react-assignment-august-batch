const express = require('express');
const app = express();
const hbs = require('hbs');
app.set('view engine','hbs');
app.set('views',__dirname+"/views")


app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/dynamic',(req,res)=>{
    let personDetails ={
        firstName:"akash",
        age:33,
        location:"Delhi"
    };
    res.render('dynamic',{personData:personDetails});
});

app.get('/projects',(req,res)=>{
    let projects={
        fullName:"Rahul",
        skills:[{
            type:"Data Mining",
            rate:4
        },
        {
            type:"Block Chain",
            rate:3
        },
        {
            type:"Nodejs",
            rate:2
        }]

    };
    res.render('projects',{projects:projects})
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})
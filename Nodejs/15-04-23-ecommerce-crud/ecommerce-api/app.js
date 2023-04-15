const express = require('express');
const parser = require('body-parser');
const app = express();
app.use(parser.json());

const productList=[
    {
        id:1,
        name:"AC",
        price:2000
    }
];

app.get('',(req,res)=>{
    res.status(200).json({
        message:"Data fetched successful",
        data:productList
    })
});

app.post('',(req,res)=>{
    let list = req.body;
    list.id=productList.length+1;
    productList.push(list);
    res.status(201).json({
        message:"Data added successful"
    })

})

app.get('/list/:id',(req,res)=>{
//route parameters
    let id = req.params.id;
    let list = productList.filter((obj)=>{
        return obj.id == id;
    })
     
    if(list.length>0){
        res.status(200).json({
            message:"Data fetched successful",
            data:list[0]
        })
    }
    else{
        res.status(404).json({
            message:"No match is found"
        }) 
    }
})

module.exports = app;
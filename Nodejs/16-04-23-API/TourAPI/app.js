const express = require('express');
const app = express();
const parser = require('body-parser');
app.use(parser.json());
const fs  = require('fs');


const list = JSON.parse(fs.readFileSync(`${__dirname}/data/tour.json`));
console.log(list);

app.get('',(req,res)=>{
    // res.status(200).send("<h1>hello world</h1>");
    // res.status(200).send({product:"ac",price:2000});
    //   res.status(200).json({
    //     message:"success",
    //     data:{product:"ac",price:2000}
    //   })
    //    res.status(404).end();
     res.status(200).json({
        data:list
     })

})

app.get('/single/product/:id',(req,res)=>{

    let id = req.params.id;
    id *=id;
    console.log(typeof id,id);

    let tourDetails = list.find((obj)=>{
        return  obj.id == id;
    })

    if(tourDetails){
        res.status(200).json({
            data:tourDetails
        })
    }
    else{
        res.status(404).json({
            message:"no id found"
        })
    }
})

app.get('/list/product/:travelType/:price',(req,res)=>{

    console.log(req.params.travelType,req.params.price);
    let result = list.filter((obj)=>{
        return obj.travelType === req.params.travelType
    }).filter((obj)=>{
          return obj.price === Number(req.params.price)
    })

    if(result.length>0){
        res.status(200).json({
            message:"success",
            data:result
        })
    }
    else{
        res.status(404).send("<h1>no details</h1");
    }
   
})

app.get('/search/product',(req,res)=>{
    console.log(req.query.travelType);
    console.log(req.query.price);
    let result = list;
    if(req.query.travelType){
       result = result.filter((obj)=>{
        return obj.travelType === req.query.travelType
       })
    }
    if(req.query.price){
        result = result.filter((obj)=>{
            return obj.price === Number(req.query.price)
           })
    }
    res.status(200).json({
        message:"success",
        data:result
    })
})



app.post('',(req,res)=>{
   let product = req.body;
   product.id = list.length+1;
   list.push(product);
   console.log(list);
   fs.writeFile(`${__dirname}/data/tour.json`,JSON.stringify(list),()=>{
      res.status(201).send("<h1>Successfully data is created</h1>")
   })
})

module.exports = app;
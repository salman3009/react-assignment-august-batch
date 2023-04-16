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


module.exports = app;
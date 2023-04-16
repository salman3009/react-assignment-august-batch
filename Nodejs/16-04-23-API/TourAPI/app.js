const express = require('express');
const app = express();
const parser = require('body-parser');
app.use(parser.json());

app.get('',(req,res)=>{
    res.status(200).send("<h1>hello world</h1>");
})


module.exports = app;
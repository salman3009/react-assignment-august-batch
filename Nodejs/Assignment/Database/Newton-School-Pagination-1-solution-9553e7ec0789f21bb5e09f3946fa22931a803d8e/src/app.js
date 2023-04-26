const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { off } = require('../models/product.js');
const products   =require("../models/product.js");

// Import routes

//Router Middlewares
app.use(express.json());


//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be rturned.
//output id can be in any order.

app.get("/",async function(req,res){

    var limit=req.query.limit,offset=req.query.offset;

    if(limit == null) limit = 5;
    else limit = parseInt(limit);
    if(offset == null) offset=0;
    else offset = parseInt(offset);

    if(limit > 5) limit = 5;

    result = await products.find({});

    var ids = [];
    const startt = (limit*offset);

    for(var i = startt; i < result.length && i < (startt+limit) ; i++){
        ids.push(result[i]["_id"]);
    }
   

    res.send(ids);

});

module.exports = app;


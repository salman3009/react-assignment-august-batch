const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { off } = require('../models/user.js');
const users   =require("../models/user.js");

// Import routes

//Router Middlewares
app.use(express.json());


//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be returned.
//output id can be in any order.

app.get("/",async function(req,res){

    var limit=req.query.limit,offset=req.query.offset;

    if(limit == null) limit = 5;
    else limit = parseInt(limit);
    if(offset == null) offset=0;
    else offset = parseInt(offset);

    if(limit > 5) limit = 5;

    result = await users.find({});

    var ids = [];
    const startt = (limit*offset);

    for(var i = startt; i < result.length && i < (startt+limit) ; i++) ids.push(result[i]["_id"]);

    res.send(ids);

});

module.exports = app;



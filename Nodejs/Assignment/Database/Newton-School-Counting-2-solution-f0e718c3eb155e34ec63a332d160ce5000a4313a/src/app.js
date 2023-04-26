const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users   =require("../models/user.js");

//Router Middlewares
app.use(express.json());


app.get("/",async function(req,res){

    var name = req.query.name, count = 0;

    result = await users.find({});

    if(typeof name === 'undefined'){
        count = result.length;
        res.send(JSON.stringify(count));
    }
    else{
        //swa
        name = name.toLowerCase();
        //[swarja,swarna]        
        for(var i = 0; i < result.length; i++){

            var len = name.length, match = 1, cur_name = result[i]['name'].toLowerCase();
            if(cur_name.length >= len){
                
                for(var j=0;j<len; j++){
                    if(cur_name[j] != name[j]){
                        match = 0;
                        break;
                    }
                }
            }
            count += match;
        }
        
        res.send(JSON.stringify(count));
    }

});

module.exports = app;

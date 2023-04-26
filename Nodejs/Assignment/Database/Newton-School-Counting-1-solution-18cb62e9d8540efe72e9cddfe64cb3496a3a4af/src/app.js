const express = require('express');
const app = express();
const mongoose = require('mongoose');
var products   =require("../models/product.js");


// Import routes

//Router Middlewares
app.use(express.json());

// Complete this Route which will return the count of number of products in the range/
//Type of query

/*

1. /
2. /?category=phone
3. /?category=laptop --> this means all the product in catgory of laptop
4. /?range=4000-5000 --> this means all the product in the range of 4000-5000
5. /?range=5000  --> this means all the product above 5000
6. /?range=4000-5000&category=laptop --> all the laptop that are in price range 4000-5000

*/


app.get("/",async function(req,res){

    var category = req.query.category;
    var p_range  = req.query.range;
    var m_price = 0, mx_price=1000000000, count = 0;

    if(p_range){

        m_price = "";
        mx_price = "";
        var f = 0;
        for(var i=0;i<p_range.length;i++){

            if(p_range[i] == '-'){
                f=1;
                continue;
            }
            if(f) mx_price = mx_price + p_range[i];
            else m_price = m_price + p_range[i];
        }
        m_price  = parseInt(m_price);
        if(mx_price.length) mx_price = parseInt(mx_price);
        else mx_price = 1000000000;
    }

    result = await products.find({});
            
    for(var i = 0; i < result.length; i++){

        if( result[i]['price'] >= m_price){
            if(result[i]['price'] <=mx_price){
            
                if(category){
                    if(category == result[i]['category'] ) count++;
                }else{
                    count++;
                }
            }
        }
    }
    
    res.send(JSON.stringify(count));

});

module.exports = app;

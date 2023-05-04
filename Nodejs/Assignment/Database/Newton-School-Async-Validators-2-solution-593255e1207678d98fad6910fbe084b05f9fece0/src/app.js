const express = require('express');
const fs = require("fs");
const app = express();
var products   =require("../models/product.js");



//Router Middlewares
app.use(express.json());

app.get("/",async function(req,res){

    var name = req.query.name;
    var description  = req.query.description;
    var price = req.query.price;

    var newProduct = {
        "name":name,
        "description":description,
        "price": price
    };

    products.create(newProduct).then((product) => {
        // console.log(user);
        res.send(product._id);
    })
    .catch((error) => {
        console.log(error.message);
        res.status(404).send(error.message);
    });

});


module.exports = app;

const fs = require('fs');
const express = require('express');
const app = express();


// Importing products from products.json file
const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/product.json`)
);


// Middlewares
app.use(express.json());

// PATCH endpoint for updating product data
app.patch('/api/v1/products/:id',(req,res)=>{
    const id = req.params.id * 1;
    const product = products.find(product => product.id===id);
    if (!product){
        return res.status(404).send({
            status: "failed",
            message: "Product not found!"
        })
    }

    product.quantity -= 1;

    if(product.quantity>=0){
        return res.status(200).json({
                status : "success",
                message :`Thank you for purchasing ${product.name}`,
                product 
        });
    }

    
    return res.status(404).json({
        status : "success",
        message :`${product.name}, Out of stock!`,
    });

    
});



module.exports = app;

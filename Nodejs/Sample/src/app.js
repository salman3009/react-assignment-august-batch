const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));
console.log(products);
// Middlewares
app.use(express.json());

//GET endpoint for sending product to the client
app.get("", (req, res) => {

  fs.writeFileSync(`${__dirname}/data/products.json`,JSON.stringify({data:'salman'}),()=>{
    res.status(200).send({
      status: "success",
      message: "Product fetched successfully",
      data: {
        products,
      },
    });
  })
  
  
});

module.exports = app;

const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

// GET endpoint for sending all the products to client
app.get("/api/v1/products", (req, res) => {
  console.log(products);
  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data: {
      products,
    },
  });
});

module.exports = app;

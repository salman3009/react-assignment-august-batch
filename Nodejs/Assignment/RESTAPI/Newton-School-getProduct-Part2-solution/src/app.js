const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
app.get("/api/v1/products/:id", (req, res) => {
  let { id } = req.params;
  id *= 1;
  const product = products.find((product) => product.id === id);
  if (!product) {
    return res.status(404).send({
      status: "failed",
      message: "Product not found!",
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "Product fetched successfully",
      data: {
        product,
      },
    });
  }
});

module.exports = app;

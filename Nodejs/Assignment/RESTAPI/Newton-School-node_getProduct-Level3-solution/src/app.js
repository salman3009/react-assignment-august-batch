const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

//GET endpoint for sending product to the client
app.get("/api/v1/products/:name/:price", (req, res) => {
  let { price, name } = req.params;
  price *= 1;

  const product = products.find(
    (product) => product.price === price && product.name === name
  );
  if (!product) {
    return res
      .status(404)
      .send({ status: "failed", message: "Product not found!" });
  }

  res.status(200).send({
    status: "success",
    message: "Product fetched successfully",
    data: {
      product,
    },
  });
});

module.exports = app;

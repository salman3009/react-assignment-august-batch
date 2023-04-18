const fs = require('fs');
const express = require('express');
const app = express();
const router = new express.Router();
const bodyParser = require('body-parser');

//middleware
router.use(express.json());
router.use(bodyParser.json());

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Handling PATCH request
router.patch('/api/v1/product/:id', (req, res) => {
  try {
    // Find the user with the specified ID
    const { title, price } = req.body;

    for (var i in product) {
      if (product[i].id == req.params.id) {
        product[i].title = title || product[i].title;
        product[i].price = price || product[i].price;

        fs.writeFile(
          `${__dirname}/../dev-data/product.json`,
          JSON.stringify(product),
          (err) => {
            res.status(201).json({
              message: 'success',

              data: {
                product,
              },
            });
          }
        );
        return;
      }
    }
    res.status(404).json({
      message: 'Product Not Found',
      status: 'Error',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Updation Failed',
      status: 'Error',
    });
  }
});

//Deleting Product
router.delete('/api/v1/product/:id', (req, res) => {
  try {
    const products = product.find((obj) => obj.id == req.params.id);
    if (!products) {
      res.status(404);
      res.json({ status: 'Error', message: 'Product not Found' });
    }
    //To delete a product we are using a filter method
    const filteredproducts = product.filter((item) => item.id != req.params.id);
    fs.writeFile(
      `${__dirname}/../dev-data/product.json`,
      JSON.stringify(filteredproducts),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            product: filteredproducts,
          },
        });
      }
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Deletion Failed',
      status: 'Error',
    });
  }
});

//Registering our Router
app.use(router);

module.exports = app;

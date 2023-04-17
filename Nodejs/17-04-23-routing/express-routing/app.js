const express = require('express');
const app = express();
app.use(express.json());
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');

app.use('/api/user',userRoute);
app.use('/api/product',productRoute);

module.exports  = app;
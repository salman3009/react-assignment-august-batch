const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const app = express();
const router = require('../routes/index');

app.use(express.json());


app.use('/api/v1/', router);
// add global error handling middleware defined in middlewares/errorHandler.js
app.use(errorHandler);

module.exports = app;
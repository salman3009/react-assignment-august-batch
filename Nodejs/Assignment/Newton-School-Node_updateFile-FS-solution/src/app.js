const express = require('express');
const app = express();


// Import routes


//Router Middlewares
app.use(express.json());
app.use('/api/user', authRoute);

module.exports = app;

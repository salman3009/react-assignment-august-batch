const express = require('express');
const app = express();


// Import routes
const authRoute = require('./routes/auth');


//Router MIddlewares
app.use(express.json());
app.use('/api/user', authRoute);


module.exports = app;

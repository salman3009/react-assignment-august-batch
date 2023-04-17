const express = require('express');
const app = express();
app.use(express.json());
const userRoute = require('./routes/user');

app.use('/api/user',userRoute);

module.exports  = app;
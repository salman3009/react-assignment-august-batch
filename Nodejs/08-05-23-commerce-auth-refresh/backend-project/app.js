const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
const authRoute = require('./routes/auth');


app.use("/api/auth",authRoute);

module.exports = app;
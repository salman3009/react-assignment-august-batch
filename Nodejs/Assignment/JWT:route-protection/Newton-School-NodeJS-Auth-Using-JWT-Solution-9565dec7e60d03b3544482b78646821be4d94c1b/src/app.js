require("dotenv").config({
    path : './.env'
  });
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const app = express();
const tokenList = {}


const authRoute = require('./routes/authentication')
app.use(express.json());
app.use('/api', authRoute)

const User = require("./model/user");



module.exports = app;
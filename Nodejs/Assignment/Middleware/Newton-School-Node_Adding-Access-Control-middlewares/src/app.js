const express = require("express");
const fs = require("fs");
const app = express();

// Importing the userRoutes module from a file in the ../routes directory
const userRoutes = require('../routes/userRoutes');

app.use(express.json());

// Using the userRouter module to handle requests to /api/v1/users
app.use('/api/v1/users', userRoutes);

module.exports = app;

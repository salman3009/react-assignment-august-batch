const router = require('express').Router();
require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const tokenList = {}

const User = require("../model/user");

router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
      function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        console.log(first_name, last_name, email, password);
  
        res.status(400).send("Please fill up all fields");
      }
      else
        if (!validateEmail(email)) {
          res.status(400).send("Enter correct email.")
        }
        else
          if (password.length < 8) {
            res.status(400).send("Minimum password length required is 8.")
          }
          else { // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({ email });
  
            if (oldUser) {
              return res.status(409).send("User Already Exist. Please Login");
            }
  
            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);
  
            // Create user in our database
            const user = await User.create({
              first_name,
              last_name,
              email: email.toLowerCase(), // sanitize: convert email to lowercase
              password: encryptedPassword,
            });
  
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
  
  
            // save user token
            user.token = token;
  
            // return new user
            res.status(201).json(user);
          }
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


  router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      else if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
  
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "20m",
          }
        );
  
        const refreshToken = jwt.sign({ user_id: user._id, email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "3h" });
  
  
        tokenList["refreshToken"] = refreshToken
  
        // user
        res.status(200).json({ token, refreshToken });
      } else
        res.status(400).send("Invalid Credentials");
    }
    catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


  router.post("/refresh", async (req, res) => {
    const data = req.body
  
    if ((data.refreshToken) && (data.refreshToken === tokenList.refreshToken)) {
  
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "20m",
        }
      );
      user.token = token
      tokenList.refreshToken = token
      res.status(200).json(user);
  
  
    }
    else {
      res.status(404).send("Invalid Request");
    }
  
  })
  
  const auth = require("../middleware/auth");
  
  router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome User!");
  });


  module.exports = router
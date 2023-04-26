const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require("fs");
const users   =require("../models/user.js");
const users_data = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));



dotenv.config();

//Connect to DB
const url = process.env.DATABASE_URL || "mongodb://localhost:27017/users";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

//insert users data to Mongodb

for(var i=0;i<users_data.length;i++){

    var name, price, description, category;
    name = users_data[i]["name"];
    password = users_data[i]["pswd"];
    email = name+"2000@gmail.com";

    var newuser = {
        "name":name,
        "email":email,
        "password": password
    };

    users.create(newuser);
}

app.listen(3000, () => console.log('Server running......'));

const express = require('express');
const app = express();

app.use(express.json());


//middleWare Function to Add2

function add2(req, res, next) {
    // console.log(req.query);
    var value = parseInt(req.query.num);
    value = value + 2;
    req.query.num = value.toString();
    next();
}

//sample Route for Test
// GET Reqest of API  '/?num=10' --> The router should return { num = 12 }

app.get('/', add2, (req, res) => {
    const data = {
        "num" : req.query.num
    };
    res.send(JSON.stringify(data));
});


module.exports = app;

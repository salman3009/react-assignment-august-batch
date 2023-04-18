const express = require('express');
const app = express();

app.use(express.json());


//MiddleWare Function to check whether it is odd or Even

function CheckisOdd(req, res, next) {
    // console.log(req.query);
    var value = parseInt(req.query.num);
    if( value%2 == 0 ){
        req.query.isOdd = false;
    }else{
        req.query.isOdd = true;
    }
    next();
}


//MiddleWare Function to Add2

function add2(req, res, next) {
    // console.log(req.query);
    var value = parseInt(req.query.num);
    value = value + 2;
    req.query.num = value.toString();
    next();
}

//sample Route for Test
// GET Reqest of API  '/?num=18' --> The router should return {"num": "20","isOdd":false}

app.get('/', add2, CheckisOdd, (req, res) => {

    const data = {
        "num" : req.query.num,
        "isOdd" : req.query.isOdd
    };
    res.send(JSON.stringify(data));
});

module.exports = app;


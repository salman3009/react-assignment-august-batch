const express = require('express');
const app = express();

app.use(express.json());


//middleWare Function to check whether it is odd or Even

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

//sample Route for Test
// GET Reqest of API  '/?num=18' --> The router should return {"num":"18","isOdd":false}

app.get('/', CheckisOdd, (req, res) => {
    const data = {
        "num" : req.query.num,
        "isOdd" : req.query.isOdd
    };
    res.send(JSON.stringify(data));
});


module.exports = app;


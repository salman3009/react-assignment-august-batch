const http = require('http');

const server = http.createServer((req,res)=>{
    //req --> request object it means any data that is coming from frontend we can able to access it.
    //res --> response object it means we are going to send the data to frontend.
     res.writeHead(200,{'Content-Type':'text/html'});
    //res.writeHead(200,{'Content-Type':' application/json'});
     //we are sending status code and content type by using writeHead method

     res.end("<h1>Hello world</h1>");
     //we are sending body response to frontend by using end method
});

module.exports = server;


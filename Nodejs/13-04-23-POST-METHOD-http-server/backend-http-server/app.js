const http = require('http');

const server = http.createServer((req,res)=>{
  
    if(req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end("<h1>Hello world</h1>");
    }
    if(req.method === 'POST'){
 
        req.on('data',(chunks)=>{
            let result = Buffer.from(chunks);
            result = result.toString();
            result = JSON.parse(result);
            console.log(result.age);
            if(result.num1%2==0){
                res.writeHead(201,{'Content-Type':'text/plain'});
                res.end("even number"); 
            }
            else{
                res.writeHead(201,{'Content-Type':'text/plain'});
                res.end("odd number"); 
            }
         
        })


        
    }
    
});

module.exports = server;


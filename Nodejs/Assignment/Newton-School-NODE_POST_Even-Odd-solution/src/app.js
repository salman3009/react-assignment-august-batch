const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];
    console.log(req.body);
    req.on('data', chunk => {
      console.log(chunk);
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      console.log(str);
      chunks.push(str);
      const obj = JSON.parse(chunks)
      const value = obj.num;
      console.log(obj.num)
    
     if (value % 2 === 0) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`The number ${value} is even`);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`The number ${value} is odd`);
      }
   });
  }

  
});


module.exports = server;

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks)
      const value1 = obj.num1;
      const value2 = obj.num2;
      
      // Code for performing exponential operation on numbers
      if(value1===0){
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`The operation cannot be performed`);
      } else {
        const result = Math.pow(value1, value2);
        res.writeHead(200,{ 'Content-Type': 'text/plain' });
        res.end(`The result is ${result}`);
      }
    })
}
});

module.exports = server;
      
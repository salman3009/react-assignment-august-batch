const app = require('./app');

const PORT = 8080;

app.listen(PORT,()=>{
    console.log("server is running",PORT);
})
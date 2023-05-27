const app = require('./app');
const environment = require('dotenv');
environment.config();

app.listen(process.env.PORT,()=>{
    console.log(`The server is running on ${process.env.PORT}`);
})
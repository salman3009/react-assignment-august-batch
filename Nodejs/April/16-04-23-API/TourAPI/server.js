const app = require('./app');
const env = require('dotenv');
env.config();

app.listen(process.env.PORT,()=>{
    console.log(`The server is running on port ${process.env.PORT}`);
})
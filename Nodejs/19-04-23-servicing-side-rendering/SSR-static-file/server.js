const app = require('./app');
const env = require('dotenv');
env.config();

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})
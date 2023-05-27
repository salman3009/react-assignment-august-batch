const app = require('./app');
const dotenv =  require('dotenv');
dotenv.config();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Database is connected");
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})
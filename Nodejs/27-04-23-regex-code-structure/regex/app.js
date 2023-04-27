const mongoose = require('mongoose');
const Employee = require('./models/employee');



const uri = "mongodb://localhost:27017/augustslack";
//const uri = "mongodb+srv://newton:nXN3TJ0SrJpmSChq@milesweb.xqz5h.mongodb.net/augustNewton";



mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
})




const findOperation = async ()=>{
     try{
        //projection
        // let result = await Employee.find({},{firstName:1,age:1,_id:0});
        //regex
        //exact keyword match
        // let result = await Employee.find({firstName:{$regex:'amol'}});
        // i - case insensitive
        let result = await Employee.find({firstName:{$regex:'amol',$options:"i"}});
        console.log(result);
     }
     catch(err){
        console.log(err);
     }
}

findOperation();


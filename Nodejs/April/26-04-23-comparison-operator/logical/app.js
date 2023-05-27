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


//logical operator
//$and  - everything should match
//$nor  - opposite of $and 
//$or  - any one match

const findOperation = async ()=>{
     try{
        // let result = await Employee.find({$and:[{firstName:"amol"},{age:{$gte:45}}]});
        // let result = await Employee.find({$nor:[{firstName:"amol"},{age:{$gte:45}}]});
        let result = await Employee.find({$or:[{firstName:"amol"},{age:{$gte:45}}]});
        console.log(result);
     }
     catch(err){
        console.log(err);
     }
}

findOperation();


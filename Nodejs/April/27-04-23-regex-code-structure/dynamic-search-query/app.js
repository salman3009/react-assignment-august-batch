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

//skip()
//limit()
//sort() 1 - ascending -1 - descending order

//below data will come from frontend
const age = 30;
const name = "amol";
const likes = 'racing'
const findOperation = async ()=>{
     try{   
        let query={};
        if(age){
            query.age = {$gte:age}
        }
        if(name){
            query.firstName = {$regex:name,$options:'i'}
        }
        if(likes){
            query.hobbies = {$in:[likes]}
        }

        console.log('final query',query);
        let result = await Employee.find(query).sort({firstName:-1});
        console.log(result);
     }
     catch(err){
        console.log(err);
     }
}

findOperation();


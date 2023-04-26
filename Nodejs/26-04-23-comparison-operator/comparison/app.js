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


//comparison operator:
//1.$eq
//2.$ne 
//3.$gt 
//4.$gte
//5.$lt
//6.$lte
//7.$in
//8.$nin

const findOperation = async ()=>{
     try{
        
        // let result = await Employee.find({firstName:{$eq:"suresh"}});
        // let result = await Employee.find({firstName:{$ne:"suresh"}});
        // let result = await Employee.find({age:{$gte:45}});
        // let result = await Employee.find({age:{$lte:45}});
        // let result = await Employee.find({hobbies:{$in:['cricket']}});
        let result = await Employee.find({hobbies:{$nin:['cricket']}});
        console.log(result);
     }
     catch(err){
        console.log(err);
     }
}

findOperation();


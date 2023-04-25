//ODM - Object Data Modelling
//It act like middleware between expressjs and mongodb
//It helps to create predefined schema and proper data will be inserted inside the database.
//mongoose is ODM for mongodb.
//All mongoose operation will return promise because everything is async operation with mongodb 
//we can you following approach from javascript:
          //1.try{}catch(){}
          //2.async await 
          //3.arrow function 
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

const createOperation=async ()=>{
    try{

        const employeePost = new Employee({
            firstName:"suresh",
            age:22,
            status:true,
            hobbies:['music','learning'],
            salary:3000
        })  
        const result = await employeePost.save();
        console.log(result);
    }
    catch(err){
      console.log(err);
    }

}

createOperation();
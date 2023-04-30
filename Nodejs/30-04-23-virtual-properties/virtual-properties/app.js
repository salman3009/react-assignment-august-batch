const mongoose = require('mongoose');
const Employee = require('./models/employee');



const uri = "mongodb://localhost:27017/virtual";
//const uri = "mongodb+srv://newton:nXN3TJ0SrJpmSChq@milesweb.xqz5h.mongodb.net/augustNewton";


mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
})


//virtual properties
//virtual representation of data without storing in database


const createOperation=async ()=>{
    try{

        const employeePost = new Employee({
            firstName:"amol",
            lastName:"raj"
        })  
        const result = await employeePost.save();
        console.log(result);
        console.log("virtual",result.fullName);
    }
    catch(err){
      console.log(err);
    }

}
//createOperation();

const findOperation=async ()=>{
  try{
  
      const result = await Employee.find();
      console.log(result);
      console.log("virtual",result[0].fullName);
  }
  catch(err){
    console.log(err);
  }

}
findOperation();
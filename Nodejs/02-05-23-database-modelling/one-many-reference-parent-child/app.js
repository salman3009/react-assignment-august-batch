const mongoose = require('mongoose');
const Student = require('./models/student');
const Address = require('./models/address');



const uri = "mongodb://localhost:27017/databaseModelling";
//const uri = "mongodb+srv://newton:nXN3TJ0SrJpmSChq@milesweb.xqz5h.mongodb.net/augustNewton";



mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
})

const createOperationStudent=async ()=>{
    try{

        const studentPost = new Student({
             studentName:"akash",
             studentId:"12MDD034",
             branch:"CSE"
        })  
        const result = await studentPost.save();
        console.log(result);
    }
    catch(err){
      console.log(err);
    }

}

// createOperationStudent();

const createOperationAddress= async ()=>{
  
  try{

    const addressPost = new Address({
      permanentAddress:"4nd street",
      city:"Bangalore",
      pincode:"344532"
 }) 

    const result = await addressPost.save();
    console.log(result);
  }
  catch(err){
    console.log(err);
  }

}
//createOperationAddress();


updateStudentAddress= async()=>{
  try{
    // const result = await Student.updateOne({studentId:"12MDD034"},{$push:{addressIds:"64512b31373f486457d13144"}})
    const result = await Student.findOne({studentId:"12MDD034"});
    console.log(result);
    result.addressIds.push("2334");
    result.save();
  }catch(err){
    console.log(err);
  }

}
updateStudentAddress();







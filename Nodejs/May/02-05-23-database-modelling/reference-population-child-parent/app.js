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

const createOperation=async ()=>{
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

// createOperation();



const createOperationAddress= async ()=>{
  
  try{

    const addressPost = new Address({
      permanentAddress:"4nd street",
      city:"Bangalore",
      pincode:"344532",
      postedBy:"64513544168351790965e19a"
 }) 

    const result = await addressPost.save();
    console.log(result);
  }
  catch(err){
    console.log(err);
  }

}
// createOperationAddress();

const findAddressDetails = async ()=>{
    try{
      const result = await Address.find();
      console.log(result);
    }catch(err){
      console.log(err);
    }
}
// findAddressDetails();

const findAddressWithStudentDetails = async ()=>{
  try{
    const result = await Address.find().populate("postedBy");
    console.log(result);
  }catch(err){
    console.log(err);
  }
}
findAddressWithStudentDetails();


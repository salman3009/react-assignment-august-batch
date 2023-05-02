const mongoose = require('mongoose');
const Student = require('./models/student');



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
             branch:"CSE",
             permanentAddress:[{
               permanentAddress:"2nd street",
               city:"Delhi",
               pincode:453134
             }]
        })  
        const result = await studentPost.save();
        console.log(result);
    }
    catch(err){
      console.log(err);
    }

}

// createOperation();


const insertOperation = async ()=>{
    try{
      let update={
        permanentAddress:"4nd street",
        city:"Mumbai",
        pincode:451134
      }
      const result = await Student.updateOne({studentId:"12MDD034"},{$push:{permanentAddress:update}})
       console.log(result);
    }catch(err){
        console.log(err);
    }
}
// insertOperation();



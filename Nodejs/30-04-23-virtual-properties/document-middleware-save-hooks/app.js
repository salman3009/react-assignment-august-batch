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


//middleware 
//Document middleware
    //methods - save,validate,remove,updateOne,deleteOne

//Query middleware 
    //methods - count,countDocuments,deleteMany,find,findOne,findOneAndDelete,
    //findOneAndRemove,findOneAndReplace,findOneAndUpdate,update,updateOne,updateMany,findById

//Aggregation middleware 
       //methods -> aggregate

//Model middleware 
   //methods -> insertMany

//save methods we have two hooks - pre and post 
//pre - before saving the data inside the database you want to do something
//post - after saving the data inside the database you want to do something

//other hooks 
//validate 
//remove 
//find 
//updateOne
///findOneAndUpdate
//update
//aggregate


const createOperation=async ()=>{
    try{

        const employeePost = new Employee({
            firstName:"amol",
            lastName:"raj"
        })  

        const result = await employeePost.save();
        console.log("while saving to database",result);
    }
    catch(err){
      console.log(err);
    }

}

createOperation();


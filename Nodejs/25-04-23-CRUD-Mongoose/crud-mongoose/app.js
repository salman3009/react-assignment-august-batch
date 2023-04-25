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
            firstName:"amol",
            age:45,
            status:false,
            hobbies:['racing','cricket'],
            salary:45000,
        })  
        const result = await employeePost.save();
        console.log(result);
    }
    catch(err){
      console.log(err);
    }

}

createOperation();


const findOperation = async ()=>{
     try{
        // let result = await Employee.find();
        // let result = await Employee.find({status:true,firstName:'amol'});
        let result = await Employee.find({_id:'6447f1d556a507e46af47bc7'});
        //return response always will be an array.
        console.log(result);
     }
     catch(err){
        console.log(err);
     }
}

//findOperation();

const updateOperation= async ()=>{
   try{
     let filter={_id:'6447f1d556a507e46af47bc7'};
     let update={salary:40000};
     //it will return return any document
    // let result = await Employee.updateOne(filter,update);

    //it is returning the document but old one
    //let result = await Employee.findOneAndUpdate(filter,update);

     //it is returning the document but new one
     let result = await Employee.findOneAndUpdate(filter,update,{new:true});
     console.log(result);

   }
   catch(err){
    console.log(err);
   }
}
//updateOperation();

const deleteOperation = async()=>{
  try{
    let filter={_id:'6447f1d556a507e46af47bc7'};
    let result = await Employee.deleteOne(filter);
    console.log(result);
  }catch(err){
    console.log(err);
  }

}
//deleteOperation();
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
            firstName:"salman",
            age:56,
            status:false,
            hobbies:['swimming'],
            salary:25000,
        })  
        const result = await employeePost.save();
        console.log(result);
    }
    catch(err){
      console.log(err);
    }

}

// createOperation();


//aggregation:
//It is pipeline of query operation.
//1.$match - filter
//2.$project - projection 
//3.$sort - asc/desc 
//4.$unwind - to destructure array into individual document.


const findOperation = async ()=>{
     try{
        // let result = await Employee.aggregate([{$project:{firstName:1,age:1,salary:1,_id:0}}])

        //  let result = await Employee.aggregate([{$match:{firstName:"amol",age:{$gte:20}}},{$project:{firstName:1,age:1,salary:1,_id:0}}])

        //let result = await Employee.aggregate([{$match:{firstName:"amol"}},{$match:{age:{$gte:20}}},{$project:{firstName:1,age:1,salary:1,_id:0}}])

       // let result = await Employee.aggregate([{$match:{age:{$gte:20}}},{$sort:{firstName:1}},{$project:{firstName:1,age:1,salary:1,_id:0}}])

       let result = await Employee.aggregate([{$match:{firstName:"suresh"}},{$unwind:"$hobbies"}])

        //return response always will be an array.
        console.log(result);
     }
     catch(err){
        console.log(err);
     }
}

findOperation();


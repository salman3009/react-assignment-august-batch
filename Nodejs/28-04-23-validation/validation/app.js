const mongoose = require('mongoose');
const Employee = require('./models/employee');



const uri = "mongodb://localhost:27017/augustslack";
//const uri = "mongodb+srv://newton:nXN3TJ0SrJpmSChq@milesweb.xqz5h.mongodb.net/augustNewton";


//validation properties:
//1.required 
//

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

        // const employeePost = new Employee({
        //     firstName:"amol",
        //     age:45,
        //     status:false,
        //     hobbies:['racing','cricket'],
        //     salary:45000,
        // })  

        const employeePost = new Employee({
          status:false
      })  
      
        const result = await employeePost.save();
        console.log(result);
    }
    catch(err){
      let errorList =[]
      if(err){
        for(field in err.errors){
          // console.log(field,err.errors[field].message);
          errorList.push({key:field,value:err.errors[field].message})
        }
      }
      console.log(errorList);
    }

}

createOperation();


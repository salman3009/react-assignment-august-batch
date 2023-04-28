const mongoose = require('mongoose');
const Employee = require('./models/employee');



const uri = "mongodb://localhost:27017/augustslackregex";
//const uri = "mongodb+srv://newton:nXN3TJ0SrJpmSChq@milesweb.xqz5h.mongodb.net/augustNewton";



mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
})

//regex pattern
   //1.i - case insensitive
   //2.^ - start symbol 
   //3.$ - end symbol 
   //regex value must be in string



const findOperation = async ()=>{
     try{
        //projection
        // let result = await Employee.find({},{firstName:1,age:1,_id:0});
        //regex
        //exact keyword match
        // let result = await Employee.find({firstName:{$regex:'amol'}});
        // i - case insensitive
        //let resultDetails = '^amol$';
        // let result = await Employee.find({firstName:{$regex:resultDetails,$options:"i"}});
        // let result = await Employee.find({firstName:{$regex:/amol/i}});
        
        //exact keyword match with case insensitive
        // let result = await Employee.find({firstName:{$regex:/^amol$/i}});

        //anything that start with am
        // let result = await Employee.find({firstName:{$regex:/^am/i}});


        //anything that ends with th
        // let search = 'cricket';
        // let regex = new RegExp(`^${search}$`, "i");
        // let result = await Employee.find({hobbies:{$in:[regex]}});


        let result = await Employee.find({hobbies: {$elemMatch: {name:'cricket'}}})
        console.log(result);
     }
     catch(err){
        console.log(err);
     }
}

findOperation();


const createOperation=async ()=>{
    try{

        const employeePost = new Employee({
            firstName:"amol",
            age:20,
            status:false,
            hobbies:[{
                name:"throwball",
                percentage:40
            }],
            salary:45000,
        })  
        const result = await employeePost.save();
        console.log(result);
    }
    catch(err){
      console.log(err);
    }

}

// createOperation();
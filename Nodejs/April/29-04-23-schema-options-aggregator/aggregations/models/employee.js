const mongoose = require('mongoose');

//Declaring properties and datatypes
const employeeSchema = mongoose.Schema({
        firstName : {type:String,
                required:true,
                set:(value) => value.toLowerCase()
        },
        age:{type:Number,required:true},
        status:{type:Boolean},
        hobbies:{type:[String],required:true},
        salary:{type:Number,required:true},
        active:{type:Boolean,default:true},
        date:{type:Date,default:Date.now}
})
//It should match proper data type 
//Everything is optional above because we have not added validation properties
//Any new property it will not take until we defined in schema

//creating collection
module.exports = mongoose.model('employee',employeeSchema);
const mongoose = require('mongoose');

//Declaring properties and datatypes
const employeeSchema = mongoose.Schema({
        firstName : {type:String},
        age:{type:Number},
        status:{type:Boolean},
        hobbies:{type:[String]},
        salary:{type:Number}
})

//creating collection
module.exports = mongoose.model('employee',employeeSchema);
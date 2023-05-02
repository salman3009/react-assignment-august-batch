const mongoose = require('mongoose');

//Declaring properties and datatypes
const studentSchema = mongoose.Schema({
        studentName : {type:String,required:true},
        studentId:{type:String,required:true},
        branch:{type:String},
        permanentAddress:[{
                permanentAddress:{type:String},
                city:{type:String},
                pinCode:{type:Number}
        }],
     //embedded sub document
})
//It should match proper data type 
//Everything is optional above because we have not added validation properties
//Any new property it will not take until we defined in schema

//creating collection
module.exports = mongoose.model('student',studentSchema);
const mongoose = require('mongoose');

//Declaring properties and datatypes
const employeeSchema = mongoose.Schema({
        firstName : {type:String,required:[true,'firstName should not be empty']},
        age:{
        type:Number,
        required:[true,'age should be in number'],
        min:[18,'age must be 18 or above'],
        max:[60,'age must be below 60']
        },
        status:{type:Boolean},
        hobbies:{type:[String]},
        salary:{type:Number,required:[true,'salary should be given']},
        active:{type:Boolean,default:true},
        date:{type:Date,default:Date.now}
})
module.exports = mongoose.model('employee',employeeSchema);
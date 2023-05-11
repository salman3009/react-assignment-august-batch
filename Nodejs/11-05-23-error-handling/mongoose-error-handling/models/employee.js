const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
     firstName:{
        type:String,
        required:[true,'firstName should be required'],
        minlength:[4,'min length is 4'],
        maxlength:[10,'max length is 10']
     },
     age:{
        type:Number,
        required:[true,'age must be required'],
        min:[18,'age must be 18 or above'],
        max:[50,'age must be less then 50']
     },
    hobbies:{
        type:[String],
        enum:['music','cricket'],
        validate:{
            validator:function(input){
                return input.length>0
            },
            message:'You must give atleast hobbies'
        }
    }
});

module.exports = mongoose.model('employee',employeeSchema);
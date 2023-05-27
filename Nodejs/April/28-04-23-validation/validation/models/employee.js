const mongoose = require('mongoose');
//Declaring properties and datatypes
const employeeSchema = mongoose.Schema({
        firstName : {
                type:String,
                required:[true,'firstName should not be empty'],
                minlength:[4,'minimum should be 4'],
                maxlength:[50,'maximum length is allowed 50'],
                validate:{
                        validator:function(input){
                                let pattern = /^[a-zA-Z0-9]+$/;
                                return pattern.test(input);
                        },
                        message:"no pattern validation matched"
                }
        },
        age:{
        type:Number,
        required:[true,'age should be in number'],
        min:[18,'age must be 18 or above'],
        max:[60,'age must be below 60']
        },
        status:{type:Boolean},
        hobbies:{
                type:[String],
                enum:['music','cricket'],
                validate:{
                    validator:function(input){
                         console.log(input);
                         return input.length >0;
                    },
                    message:"you must have atleast one data"    
                }
        },
        salary:{
                type:Number,
                required:[true,'salary should be given'],
                validate:{
                        validator:function(v){
                                return new Promise((resolve) => {
                                        setTimeout(async () => {
                                          //true/false
                                           resolve(true)
                                        }, 4000);
                                      });
                        },
                        message: 'A course should have at least one tags',
                }
        },
        active:{type:Boolean,default:true},
        date:{type:Date,default:Date.now}
})
module.exports = mongoose.model('employee',employeeSchema);
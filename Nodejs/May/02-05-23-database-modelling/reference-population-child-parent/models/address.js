const mongoose = require('mongoose');

//Declaring properties and datatypes
const addressSchema = mongoose.Schema({
                permanentAddress:{type:String},
                city:{type:String},
                pinCode:{type:Number},
                postedBy:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'student'
                }
})
//It should match proper data type 
//Everything is optional above because we have not added validation properties
//Any new property it will not take until we defined in schema

//creating collection
module.exports = mongoose.model('address',addressSchema);
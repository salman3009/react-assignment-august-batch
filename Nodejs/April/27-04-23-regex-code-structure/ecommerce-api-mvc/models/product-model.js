const mongoose = require('mongoose');

//Declaring properties and datatypes
const productSchema = mongoose.Schema({
        name : {type:String,required:true},
        price:{type:Number,required:true},
        date:{type:Date,default:Date.now},
        quantity:{type:Number,required:true}
})

module.exports = mongoose.model('product',productSchema);
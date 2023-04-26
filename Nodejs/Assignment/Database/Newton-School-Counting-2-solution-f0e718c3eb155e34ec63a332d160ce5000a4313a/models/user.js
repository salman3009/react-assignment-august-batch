const { number, required } = require("joi");
var mongoose= require("mongoose");

var userSchema= mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required :true
    },
    email:{
        type: String,
        required :true
    }    
});

module.exports =mongoose.model("users",userSchema);